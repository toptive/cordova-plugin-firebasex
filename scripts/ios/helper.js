var fs = require("fs");
var path = require("path");
var utilities = require("../lib/utilities");
var xcode = require("xcode");

module.exports = {

    /**
     * Used to get the path to the XCode project's .pbxproj file.
     */
    getXcodeProjectPath: function () {
        var appName = utilities.getAppName();
        return path.join("platforms", "ios", appName + ".xcodeproj", "project.pbxproj");
    },

    ensureRunpathSearchPath: function(context, xcodeProjectPath){

        function addRunpathSearchBuildProperty(proj, build) {
            const LD_RUNPATH_SEARCH_PATHS = proj.getBuildProperty("LD_RUNPATH_SEARCH_PATHS", build);
            if (!LD_RUNPATH_SEARCH_PATHS) {
                proj.addBuildProperty("LD_RUNPATH_SEARCH_PATHS", "\"$(inherited) @executable_path/Frameworks\"", build);
            }
            if (LD_RUNPATH_SEARCH_PATHS.indexOf("@executable_path/Frameworks") == -1) {
                var newValue = LD_RUNPATH_SEARCH_PATHS.substr(0, LD_RUNPATH_SEARCH_PATHS.length - 1);
                newValue += ' @executable_path/Frameworks\"';
                proj.updateBuildProperty("LD_RUNPATH_SEARCH_PATHS", newValue, build);
            }
            if (LD_RUNPATH_SEARCH_PATHS.indexOf("$(inherited)") == -1) {
                var newValue = LD_RUNPATH_SEARCH_PATHS.substr(0, LD_RUNPATH_SEARCH_PATHS.length - 1);
                newValue += ' $(inherited)\"';
                proj.updateBuildProperty("LD_RUNPATH_SEARCH_PATHS", newValue, build);
            }
        }

        // Read and parse the XCode project (.pxbproj) from disk.
        // File format information: http://www.monobjc.net/xcode-project-file-format.html
        var xcodeProject = xcode.project(xcodeProjectPath);
        xcodeProject.parseSync();

        // Add search paths build property
        addRunpathSearchBuildProperty(xcodeProject, "Debug");
        addRunpathSearchBuildProperty(xcodeProject, "Release");

        // Finally, write the .pbxproj back out to disk.
        fs.writeFileSync(path.resolve(xcodeProjectPath), xcodeProject.writeSync());
    },
    stripDebugSymbols: function(){
        var podFilePath = 'platforms/ios/Podfile',
            podFile = fs.readFileSync(path.resolve(podFilePath)).toString();
        if(!podFile.match('DEBUG_INFORMATION_FORMAT')){
            podFile += "\npost_install do |installer|\n" +
                "    installer.pods_project.targets.each do |target|\n" +
                "        target.build_configurations.each do |config|\n" +
                "            config.build_settings['DEBUG_INFORMATION_FORMAT'] = 'dwarf'\n" +
                "        end\n" +
                "    end\n" +
                "end";
            fs.writeFileSync(path.resolve(podFilePath), podFile);
            console.log('cordova-plugin-firebasex: Applied IOS_STRIP_DEBUG to Podfile');
        }
    },
};
