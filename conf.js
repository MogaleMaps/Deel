exports.config = {
  specs: ['./src/Test/todo-spec.js'],
  allScriptsTimeout: 80000,
  onPrepare: function(){
    // Getting CLI report
        browser.driver.ignoreSynchronization = true;// for non-angular set true. default value is false 
         browser.waitForAngularEnabled(false);   // for non-angular set false. default value is true  
          const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
          jasmine.getEnv().addReporter(new SpecReporter({
          spec: {
            displayStacktrace: true
          }
        }));
 
    //Getting XML report
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
           consolidateAll: true,
           filePrefix: 'guitest-xmloutput',
           savePath: '.'
        }));
    //Getting screenshots
      var fs = require('fs-extra');
        fs.emptyDir('screenshots/', function (err) {
                 console.log(err);
             });
             jasmine.getEnv().addReporter({
                 specDone: function(result) {
                     if (result.status == 'failed') {
                         browser.getCapabilities().then(function (caps) {
                             var browserName = caps.get('browserName');
                             browser.takeScreenshot().then(function (png) {
                                 var stream = fs.createWriteStream('screenshots/' + browserName + '-' + result.fullName+ '.png');
                                 stream.write(new Buffer.from(png, 'base64'));
                                 stream.end();
                             });
                         });
                     }
                 }
             });
    },
      onComplete: function() {
    //Getting HTML report
    var browserName, browserVersion;
         var capsPromise = browser.getCapabilities();
         capsPromise.then(function (caps) {
            browserName = caps.get('browserName');
            browserVersion = caps.get('version');
            platform = caps.get('platform');
            var HTMLReport = require('protractor-html-reporter-2');
            testConfig = {
                reportTitle: 'Deel E2E Test Execution Report',
                outputPath: './TestReport',
                outputFilename: 'ProtractorTestReport',
                screenshotPath: './screenshots',
                testBrowser: browserName,
                browserVersion: browserVersion,
                modifiedSuiteName: false,
                screenshotsOnlyOnFailure: true,
                testPlatform: platform
            };
            new HTMLReport().from('guitest-xmloutput.xml', testConfig);
        });
      }
  }