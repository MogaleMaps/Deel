var config = require('/WS2/deelautomation/src/Common/setup.js')
var username = element(by.name('email'));
var password=element(by.name('password'))
var btnLogin = element(by.xpath('//*[@id="root"]/div/div[2]/div[2]/div[4]/div/div/form/div[4]/button'));
var txtCompanyName = element(by.name('companyName'))
var txtTeamName = element(by.name('teamName'))
var txtStreet = element(by.name('street'))
var txtCity = element(by.name('city'))
var txtZip = element(by.name('zip'))
var selectCountry = element(by.xpath('//*[@id="root"]/div/div[2]/div[2]/div/div/form/div[1]/div/div[1]/div[3]'))
var until = protractor.ExpectedConditions;
var btnViewMyContracts = element(by.xpath('//*[@id="root"]/div/div[2]/div[4]/div/div[3]/div[1]/div/div[1]/div/a/button'))
var btnCreateContract = element(by.xpath('//*[@id="root"]/div/div[2]/div[4]/div/div[2]/div/div/div/a/button'))
var btnFixedRateContract = element(by.xpath('//*[@id="root"]/div/div[2]/div[4]/div/div[3]/div[1]/a/div/p'))
var txtContractName = element(by.xpath('//*[@id="root"]/div/div[2]/div[4]/div/form/div[2]/div/div[1]/div/div/div/input'))
var selectTaxResidence = element(by.xpath('//*[@id="root"]/div/div[2]/div[4]/div/form/div[2]/div/div[2]/div/div/div/div/label'))
describe('Deel UI Automation ', function() {

  it('Login to Deel', function() { 
    browser.get("https://app.deel.training/");
    
    browser.wait(until.presenceOf(username));
    
    username.sendKeys("mogalemapaela@testters.com");
    password.sendKeys("9!GKtcD3BLkNLkt");
    btnLogin.click()
    expect(browser.getCurrentUrl()).toEqual("https://app.deel.training/login");
  });

    it('Click View My Contracts', function() { 
      browser.wait(until.presenceOf(btnViewMyContracts));
      btnViewMyContracts.click();
      expect(browser.getCurrentUrl()).toEqual("https://app.deel.training/contracts");
    });

    it('Click Create Contract', function() { 
      browser.wait(until.presenceOf(btnCreateContract));
      btnCreateContract.click();
      expect(browser.getCurrentUrl()).toEqual("https://app.deel.training/create");
    });

    it('Create a Fixed Rate Contract', function() { 
      browser.wait(until.presenceOf(btnFixedRateContract));
      btnFixedRateContract.click();
      expect(browser.getCurrentUrl()).toEqual("https://app.deel.training/create/fixed");

      txtContractName.click()
      txtContractName.sendKeys("Test Contract")
      selectTaxResidence.sendKeys("South Africa")
    });

  });