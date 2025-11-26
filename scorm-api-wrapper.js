/**
 * SCORM 1.2 API Wrapper for GrammarMaster
 * This wrapper handles communication between the lessons and the LMS
 */

var ScormAPI = (function() {
    var api = null;
    var initialized = false;
    var finished = false;

    // Find the SCORM API in the window hierarchy
    function findAPI(win) {
        var attempts = 0;
        var maxAttempts = 500;

        while ((!win.API) && (win.parent) && (win.parent != win) && (attempts < maxAttempts)) {
            attempts++;
            win = win.parent;
        }

        if (win.API) {
            return win.API;
        }

        // Try opener window
        if (window.opener && window.opener.API) {
            return window.opener.API;
        }

        // Try to find in opener's parent hierarchy
        if (window.opener) {
            var openerWin = window.opener;
            attempts = 0;
            while ((!openerWin.API) && (openerWin.parent) && (openerWin.parent != openerWin) && (attempts < maxAttempts)) {
                attempts++;
                openerWin = openerWin.parent;
            }
            if (openerWin.API) {
                return openerWin.API;
            }
        }

        return null;
    }

    // Initialize connection to LMS
    function initialize() {
        if (initialized) {
            return true;
        }

        api = findAPI(window);

        if (api == null) {
            console.warn("SCORM API not found. Running in standalone mode.");
            // Create a mock API for standalone testing
            api = createMockAPI();
            initialized = true;
            return true;
        }

        var result = api.LMSInitialize("");
        
        if (result === "true" || result === true) {
            initialized = true;
            console.log("SCORM initialized successfully");
            return true;
        } else {
            var error = api.LMSGetLastError();
            console.error("SCORM initialization failed. Error: " + error);
            return false;
        }
    }

    // Create mock API for standalone testing (uses localStorage)
    function createMockAPI() {
        console.log("Creating mock SCORM API for standalone testing");
        
        var mockData = {
            "cmi.core.student_name": "Test Student",
            "cmi.core.student_id": "test123",
            "cmi.core.lesson_status": "incomplete",
            "cmi.core.lesson_location": "",
            "cmi.core.score.raw": "",
            "cmi.suspend_data": ""
        };

        // Try to load from localStorage
        try {
            var saved = localStorage.getItem('grammarmaster_scorm_mock');
            if (saved) {
                var parsed = JSON.parse(saved);
                Object.assign(mockData, parsed);
            }
        } catch (e) {
            console.warn("Could not load mock data from localStorage");
        }

        return {
            LMSInitialize: function() { return "true"; },
            LMSFinish: function() { 
                try {
                    localStorage.setItem('grammarmaster_scorm_mock', JSON.stringify(mockData));
                } catch (e) {}
                return "true"; 
            },
            LMSGetValue: function(key) { 
                return mockData[key] || ""; 
            },
            LMSSetValue: function(key, value) { 
                mockData[key] = value;
                try {
                    localStorage.setItem('grammarmaster_scorm_mock', JSON.stringify(mockData));
                } catch (e) {}
                return "true"; 
            },
            LMSCommit: function() { 
                try {
                    localStorage.setItem('grammarmaster_scorm_mock', JSON.stringify(mockData));
                } catch (e) {}
                return "true"; 
            },
            LMSGetLastError: function() { return "0"; },
            LMSGetErrorString: function() { return "No error"; },
            LMSGetDiagnostic: function() { return ""; }
        };
    }

    // Get value from LMS
    function getValue(key) {
        if (!initialized) {
            initialize();
        }

        if (api == null) {
            return "";
        }

        var value = api.LMSGetValue(key);
        var error = api.LMSGetLastError();

        if (error !== "0" && error !== 0) {
            console.warn("SCORM getValue error for " + key + ": " + error);
        }

        return value;
    }

    // Set value in LMS
    function setValue(key, value) {
        if (!initialized) {
            initialize();
        }

        if (api == null) {
            return false;
        }

        var result = api.LMSSetValue(key, value);
        var error = api.LMSGetLastError();

        if (error !== "0" && error !== 0) {
            console.warn("SCORM setValue error for " + key + ": " + error);
            return false;
        }

        return (result === "true" || result === true);
    }

    // Commit data to LMS
    function commit() {
        if (!initialized || api == null) {
            return false;
        }

        var result = api.LMSCommit("");
        return (result === "true" || result === true);
    }

    // Finish/close connection to LMS
    function finish() {
        if (!initialized || finished || api == null) {
            return true;
        }

        var result = api.LMSFinish("");
        finished = true;
        
        return (result === "true" || result === true);
    }

    // Get student name from LMS
    function getStudentName() {
        return getValue("cmi.core.student_name");
    }

    // Get student ID from LMS
    function getStudentId() {
        return getValue("cmi.core.student_id");
    }

    // Get lesson status
    function getLessonStatus() {
        return getValue("cmi.core.lesson_status");
    }

    // Set lesson status (incomplete, completed, passed, failed)
    function setLessonStatus(status) {
        return setValue("cmi.core.lesson_status", status);
    }

    // Get score
    function getScore() {
        var score = getValue("cmi.core.score.raw");
        return score ? parseFloat(score) : 0;
    }

    // Set score (0-100)
    function setScore(score) {
        setValue("cmi.core.score.min", "0");
        setValue("cmi.core.score.max", "100");
        return setValue("cmi.core.score.raw", String(score));
    }

    // Get lesson location (bookmark)
    function getLessonLocation() {
        return getValue("cmi.core.lesson_location");
    }

    // Set lesson location (bookmark)
    function setLessonLocation(location) {
        return setValue("cmi.core.lesson_location", location);
    }

    // Get suspend data (custom data storage)
    function getSuspendData() {
        var data = getValue("cmi.suspend_data");
        if (data) {
            try {
                return JSON.parse(data);
            } catch (e) {
                return {};
            }
        }
        return {};
    }

    // Set suspend data (custom data storage)
    function setSuspendData(data) {
        var jsonData = JSON.stringify(data);
        return setValue("cmi.suspend_data", jsonData);
    }

    // GrammarMaster specific: Save lesson progress
    function saveLessonProgress(lessonId, progressData) {
        var allData = getSuspendData();
        
        if (!allData.lessons) {
            allData.lessons = {};
        }
        
        allData.lessons[lessonId] = progressData;
        
        setSuspendData(allData);
        commit();
        
        console.log("Saved progress for " + lessonId + ":", progressData);
    }

    // GrammarMaster specific: Get lesson progress
    function getLessonProgress(lessonId) {
        var allData = getSuspendData();
        
        if (allData.lessons && allData.lessons[lessonId]) {
            return allData.lessons[lessonId];
        }
        
        return null;
    }

    // GrammarMaster specific: Get all lesson progress
    function getAllLessonProgress() {
        var allData = getSuspendData();
        return allData.lessons || {};
    }

    // GrammarMaster specific: Calculate and save overall course progress
    function updateCourseProgress() {
        var allProgress = getAllLessonProgress();
        var totalPercent = 0;
        var lessonCount = 0;
        
        for (var lessonId in allProgress) {
            if (allProgress[lessonId] && typeof allProgress[lessonId].percentage === 'number') {
                totalPercent += allProgress[lessonId].percentage;
                lessonCount++;
            }
        }
        
        var avgProgress = lessonCount > 0 ? Math.round(totalPercent / lessonCount) : 0;
        
        setScore(avgProgress);
        
        if (avgProgress >= 100) {
            setLessonStatus("completed");
        } else if (avgProgress > 0) {
            setLessonStatus("incomplete");
        }
        
        commit();
        
        return avgProgress;
    }

    // Public API
    return {
        initialize: initialize,
        getValue: getValue,
        setValue: setValue,
        commit: commit,
        finish: finish,
        getStudentName: getStudentName,
        getStudentId: getStudentId,
        getLessonStatus: getLessonStatus,
        setLessonStatus: setLessonStatus,
        getScore: getScore,
        setScore: setScore,
        getLessonLocation: getLessonLocation,
        setLessonLocation: setLessonLocation,
        getSuspendData: getSuspendData,
        setSuspendData: setSuspendData,
        saveLessonProgress: saveLessonProgress,
        getLessonProgress: getLessonProgress,
        getAllLessonProgress: getAllLessonProgress,
        updateCourseProgress: updateCourseProgress
    };
})();

// Auto-initialize when script loads
document.addEventListener('DOMContentLoaded', function() {
    ScormAPI.initialize();
});

// Auto-finish when page unloads
window.addEventListener('beforeunload', function() {
    ScormAPI.commit();
    ScormAPI.finish();
});

window.addEventListener('unload', function() {
    ScormAPI.finish();
});

