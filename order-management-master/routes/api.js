const express = require('express');
const authenticate = require("./../middleware/authenticate");

var router = express.Router();

// const EnquiryController = require('./../controllers/enquiryController');
const LoginController = require('./../controllers/loginController');
const UserController = require('./../controllers/userController');
const DashboardController = require('./../controllers/dashboardController');
const EnquiryController = require('./../controllers/enquiryController');
const StockController = require('./../controllers/stockController');
const PurchaseController = require('./../controllers/purchaseController');
const OrderController = require('./../controllers/orderController');
const SettingController = require('./../controllers/settingController');
const CashEntryController = require('./../controllers/cashEntryController');
const CourierController = require('./../controllers/courierController');
const PetrolReadingController = require('./../controllers/petrolReadingController');
const TeamController = require('./../controllers/teamController');
const LedgerController = require('./../controllers/ledgerController');

//Cash Entry API
router.post('/add-cash-entry', authenticate, CashEntryController.addCashEntry);

router.get('/salary-advance', authenticate, CashEntryController.salaryAdvance);
router.post('/search-salary-advance', authenticate, CashEntryController.searchSalaryAdvance);
router.post('/add-bill-order', authenticate, CashEntryController.addBillOrder);
router.post('/remove-bill-order', authenticate, CashEntryController.removeBillOrder);

router.get('/contra', authenticate, CashEntryController.contra);
router.post('/search-contra', authenticate, CashEntryController.searchContra);

router.get('/expense', authenticate, CashEntryController.expense);
router.post('/search-expense', authenticate, CashEntryController.searchExpense);

router.get('/loan', authenticate, CashEntryController.loan);
router.post('/search-loan', authenticate, CashEntryController.searchLoan);

router.get('/purchase-cash-entry', authenticate, CashEntryController.purchaseCashEntry);
router.post('/search-purchase-cash-entry', authenticate, CashEntryController.searchPurchaseCashEntry);

router.get('/sale-cash-entry', authenticate, CashEntryController.saleCashEntry);
router.post('/search-sale-cash-entry', authenticate, CashEntryController.searchSaleCashEntry);

router.post('/delete-cash-entry', authenticate, CashEntryController.deleteCashEntry);

// router.get('/expense', CashEntryController.expense);
// router.post('/search-expense', CashEntryController.searchExpense);

// Login api
router.get('/user', authenticate, UserController.user);
router.get('/add-user', authenticate, UserController.addUser)
router.get('/all-user', authenticate, UserController.allUser);
router.post('/create-user', authenticate, UserController.createUser);
router.get('/fetch-marketing-person-name/:id', authenticate, UserController.fetchMarketingPersonName);
router.post('/update-user', authenticate, UserController.updateUser);
router.post('/update-user/:id', authenticate, UserController.updateUser);

router.get('/today-attendance', authenticate, UserController.todayAttendance);
router.post('/create-attendance', authenticate, UserController.createAttendance);
router.get('/add-out-time-attendance', authenticate, UserController.addOutTimeAttendance);
router.get('/all-user-previous-attendance', authenticate, UserController.allUserPreviousAttendance);
router.post('/update-out-time-attendance', authenticate, UserController.updateOutTimeAttendance);
router.get('/see-attendance', authenticate, UserController.seeAttendance);
router.post('/search-date-attendance', authenticate, UserController.searchDateAttendance);
router.get('/complete-attendance', authenticate, UserController.completeAttendance);
router.post('/create-complete-attendance', authenticate, UserController.createCompleteAttendance);

router.get('/user-role/:id', authenticate, UserController.userRole);

router.get('/', LoginController.login);
router.post('/login-user', LoginController.loginUser);
router.get('/logout', LoginController.logout);
// router.get('/logout', EnquiryController.logout);

// dashboard api
router.get('/dashboard', authenticate, DashboardController.dashboard);
router.get('/today-dashboard', authenticate, DashboardController.todayDashboard);
router.get('/dealer-dashboard', authenticate, DashboardController.dealerDashboard);
router.get('/user-dashboard/:id', authenticate, DashboardController.userDashboard);

// Enquiry api
router.get('/add-enquiry', authenticate, EnquiryController.addEnquiry);
router.post('/create-enquiry', authenticate, EnquiryController.createEnquiry);
router.get('/see-enquiry', authenticate, EnquiryController.seeEnquiry);
router.get('/see-enquiry/:id', authenticate, EnquiryController.seeEnquiry);
router.get('/see-dealer-enquiry', authenticate, EnquiryController.seeDealerEnquiry);
router.get('/see-today-followup-enquiry', authenticate, EnquiryController.seeTodayFollowupEnquiry);
router.get('/see-today-followup-enquiry/:id', authenticate, EnquiryController.seeTodayFollowupEnquiry);
router.get('/show-enquiry', authenticate, EnquiryController.showEnquiry);
router.get('/show-enquiry-followup', authenticate, EnquiryController.showEnquiryFollowup);
router.get('/see-enquiry-followup', authenticate, EnquiryController.showEnquiryFollowup);
router.post('/search-enquiry', authenticate, EnquiryController.searchEnquiry);
router.get('/edit-enquiry-page/:id', authenticate, authenticate, EnquiryController.editEnquiryPage);
router.get('/view-enquiry-page/:id', authenticate, EnquiryController.viewEnquiryPage);
router.post('/update-enquiry/:id', authenticate, EnquiryController.updateEnquiry);
router.post('/update-enquiry', authenticate, EnquiryController.updateEnquiry);
router.post('/update-enquiry-opening/:id', authenticate, EnquiryController.updateEnquiryOpening);
router.get('/fetch-enquiry/:id', authenticate, EnquiryController.fetchEnquiry);
router.post('/change-user', authenticate, EnquiryController.changeUser);
router.get('/quotation-entry/:id', authenticate, EnquiryController.quotationEntry);
router.post('/create-quotation', authenticate, EnquiryController.createQuotation);
router.get('/fetch-quotation/:id', authenticate, EnquiryController.fetchQuotation);
router.get('/fetch-followup/:id', authenticate, EnquiryController.fetchFollowup);

// followup api
router.post('/update-followup', authenticate, EnquiryController.updateFollowup);
router.post('/update-next-followup-date', authenticate, EnquiryController.updateNextFollowupDate);

router.get('/show-debtor', authenticate, EnquiryController.showDebtor);
router.get('/all-debtor-list', authenticate, EnquiryController.allDebtorList);

//Ledger API
router.get('/view-enquiry-ledger/:id', authenticate, LedgerController.viewEnquiryLedger);
router.post('/search-enquiry-ledger/:id', authenticate, LedgerController.searchEnquiryLedger);

router.get('/view-purchase-ledger/:id', authenticate, LedgerController.viewPurchaseLedger);
router.post('/search-purchase-ledger/:id', authenticate, LedgerController.searchPurchaseLedger);
router.post('/debtor-ledger', authenticate, LedgerController.debtorLedger);

//Stock API
router.get('/item-group', authenticate, StockController.itemGroup);
router.post('/delete-item-data', authenticate, StockController.deleteItemData);
router.post('/create-item-group', authenticate, StockController.createItemGroup);
router.get('/all-item-group', authenticate, StockController.allItemGroup);
router.get('/all-item-name/:id', authenticate, StockController.allItemName);
router.post('/all-item-name', authenticate, StockController.allItemName);
router.get('/fetch-all-item-name', authenticate, StockController.fetchAllItemName);
router.post('/create-item-name', authenticate, StockController.createItemName);
router.get('/purchase-stock', authenticate, StockController.purchaseStock);
router.post('/create-purchase-stock', authenticate, StockController.createPurchaseStock);
router.post('/update-item-name', authenticate, StockController.updateItemName);

router.get('/purchase-booking', authenticate, StockController.purchaseBooking);
router.get('/add-purchase-booking', authenticate, StockController.addPurchaseBooking);
router.post('/create-purchase-booking', authenticate, StockController.createPurchaseBooking);
router.post('/search-purchase-booking', authenticate, StockController.searchPurchaseBooking);
router.post('/create-purchase-booking-group', authenticate, StockController.createPurchaseBookingGroup);

router.get('/purchase-group', authenticate, StockController.purchaseGroup);
router.post('/search-purchase-group', authenticate, StockController.searchPurchaseGroup);
router.get('/view-purchase-booking/:id', authenticate, StockController.viewPurchaseBooking);

router.get('/receive-purchase-stock', authenticate, StockController.receivePurchaseStock);
router.get('/all-not-receive-purchase-stock', authenticate, StockController.allNotReceivePurchaseStock);
router.get('/receive-purchase-entry/:id', authenticate, StockController.receivePurchaseEntry);
router.post('/receive-stock-data', authenticate, StockController.receiveStockData);
router.post('/add-receive-stock', authenticate, StockController.addReceiveStock);
router.post('/receive-stock-confirm/:id', authenticate, StockController.receiveStockConfirm);

router.get('/confirm-purchase-stock', authenticate, StockController.confirmPurchaseStock);
router.get('/all-not-confirm-purchase-stock', authenticate, StockController.allNotConfirmPurchaseStock);
router.get('/confirm-purchase-entry/:id', authenticate, StockController.confirmPurchaseEntry);

router.get('/fetch-purchase-item-name/:id', authenticate, StockController.fetchPurchaseItemName);
router.post('/update-stock-data', authenticate, StockController.updateStockData);
router.post('/delete-stock-data', authenticate, StockController.deleteStockData);
router.post('/add-stock-data', authenticate, StockController.addStockData);

router.get('/see-stock', authenticate, StockController.seeStock);
router.get('/see-godown-one-stock', authenticate, StockController.seeGodownOneStock);
router.get('/see-godown-two-stock', authenticate, StockController.seeGodownTwoStock);
router.get('/see-godown-three-stock', authenticate, StockController.seeGodownThreeStock);

router.get('/godown-transfer', authenticate, StockController.godownTransfer);

router.get('/physical-stock', authenticate, StockController.physicalStock);
router.get('/add-physical-stock', authenticate, StockController.addPhysicalStock);
router.post('/create-physical-stock', authenticate, StockController.createPhysicalStock);
router.post('/search-physical-stock', authenticate, StockController.searchPhysicalStock);

router.get('/tally-stock', authenticate, StockController.tallyStock);
router.get('/add-tally-stock', authenticate, StockController.addTallyStock);
router.post('/create-tally-stock', authenticate, StockController.createTallyStock);
router.post('/search-tally-stock', authenticate, StockController.searchTallyStock);

router.get('/fabricate-stock', authenticate, StockController.fabricateStock);
router.get('/all-not-fabricate-stock', authenticate, StockController.allNotFabricateStock);
router.get('/fabricate-entry/:id', authenticate, StockController.fabricateEntry);
router.get('/fetch-fabricate-stock/:id', authenticate, StockController.fetchFabricateStock);

//Purhcase API
router.get('/add-purchase-party', authenticate, PurchaseController.addPurchaseParty);
router.post('/create-purchase-party', authenticate, PurchaseController.createPurchaseParty);
router.get('/all-purchase-party', authenticate, PurchaseController.allPurchaseParty);
router.get('/see-purchase-party', authenticate, PurchaseController.seePurchaseParty);

//Order API
router.get('/order-entry', authenticate, OrderController.orderEntry);
router.get('/bo-entry/:id', authenticate, OrderController.boEntry);
router.post('/create-bo', authenticate, OrderController.createBO);
router.get('/po-entry/:id', authenticate, OrderController.poEntry);
router.post('/create-po', authenticate, OrderController.createPO);
router.get('/co-entry/:id', authenticate, OrderController.coEntry);
router.post('/create-co', authenticate, OrderController.createCO);
router.get('/book-order', authenticate, OrderController.bookOrder);
router.get('/all-book-order', authenticate, OrderController.allBookOrder);
router.get('/book-pending-entry/:id', authenticate, OrderController.bookPendingEntry);
router.post('/pending-book-order', authenticate, OrderController.pendingBookOrder);
router.get('/see-order', authenticate, OrderController.seeOrder);
router.post('/search-order', authenticate, OrderController.searchOrder);
router.get('/view-order/:id', authenticate, OrderController.viewOrder);
router.get('/search-order-id/:id', authenticate, OrderController.searchOrderId);
router.post('/update-order/:id', authenticate, OrderController.updateOrder);
router.post('/delete-order-data', authenticate, OrderController.deleteOrderData);

router.get('/pending-order', authenticate, OrderController.pendingOrder);
router.get('/all-pending-order', authenticate, OrderController.allPendingOrder);
router.get('/pending-confirm-entry/:id', authenticate, OrderController.pendingConfirmEntry);
router.post('/confirm-pending-order', authenticate, OrderController.confirmPendingOrder);
router.get('/all-pending-bill-confirm-order', authenticate, OrderController.allPendingBillConfirmOrder);
router.get('/all-party-confirm-order/:id', authenticate, OrderController.allPartyConfirmOrder);

router.get('/mis-order-report', authenticate, OrderController.misOrderReport);
router.get('/all-mis-order', authenticate, OrderController.allMisOrder);
router.post('/update-fabricate-order', authenticate, OrderController.updateFabricateOrder);
router.post('/update-check-order', authenticate, OrderController.updateCheckOrder);
router.post('/update-dispatch-order', authenticate, OrderController.updateDispatchOrder);

router.get('/create-sale-bill-page', authenticate, OrderController.createSaleBillPage);
router.get('/all-bill-order/:id', authenticate, OrderController.allBillOrder);
router.get('/see-sale-bill', authenticate, OrderController.seeSaleBill);
router.post('/search-sale-bill', authenticate, OrderController.searchSaleBill);
router.get('/view-sale-bill/:id', authenticate, OrderController.viewSaleBill);
router.get('/fetch-bill-order/:id', authenticate, OrderController.fetchBillOrder);

//Fabricate 
router.post('/create-fabricate-item', authenticate, OrderController.createFabricateItem);
router.get('/view-fabricate/:id', authenticate, OrderController.viewFabricate);


router.post('/create-sale-bill', authenticate, CashEntryController.createSaleBill);
router.post('/update-sale-bill/:id', authenticate, CashEntryController.updateSaleBill);
//Setting API
router.get('/colour', authenticate, SettingController.colour);
router.get('/all-colour', authenticate, SettingController.allColour);
router.post('/create-colour', authenticate, SettingController.createColour);

router.get('/size', authenticate, SettingController.size);
router.get('/all-size', authenticate, SettingController.allSize);
router.post('/create-size', authenticate, SettingController.createSize);

router.get('/cash-bank-book', authenticate, SettingController.cashBankBook);
router.get('/all-cash-bank-book', authenticate, SettingController.allCashBankBook);
router.post('/create-cash-bank-book', authenticate, SettingController.createCashBankBook);

router.get('/expense-list', authenticate, SettingController.expenseList);
router.get('/all-expense-list', authenticate, SettingController.allExpenseList);
router.post('/create-expense-list', authenticate, SettingController.createExpenseList);

router.get('/loan-list', authenticate, SettingController.loanList);
router.get('/all-loan-list', authenticate, SettingController.allLoanList);
router.post('/create-loan-list', authenticate, SettingController.createLoanList);

router.get('/all-group-list', authenticate, SettingController.allGroupList);

//Courier Controller
router.get('/request-courier', authenticate, CourierController.requestCourier);
router.get('/request-courier-page/:id', authenticate, CourierController.requestCourierPage);
router.post('/create-courier', authenticate, CourierController.createCourier);
router.get('/requested-courier', authenticate, CourierController.requestedCourier);
router.get('/all-requested-courier', authenticate, CourierController.allRequestedCourier);
router.post('/confirm-courier', authenticate, CourierController.confirmCourier);

router.get('/send-courier', authenticate, CourierController.sendCourier);
router.get('/all-send-courier', authenticate, CourierController.allSendCourier);
router.post('/create-send-courier', authenticate, CourierController.createSendCourier);

router.get('/recieve-courier', authenticate, CourierController.recieveCourier);
router.get('/all-recieve-courier', authenticate, CourierController.allRecieveCourier);
router.post('/create-recieve-courier', authenticate, CourierController.createRecieveCourier);

router.get('/view-courier', authenticate, CourierController.viewCourier);
router.post('/search-courier', authenticate, CourierController.searchCourier);
router.get('/view-courier-detail/:id', authenticate, CourierController.viewCourierDetail);
// router.get('/view-courier', CourierController.viewCourier);
// router.post('/search-courier', CourierController.searchCourier);

//Petrol Controller
router.get('/start-petrol-reading', authenticate, PetrolReadingController.startPetrolReading);
router.post('/create-petrol-reading', authenticate, PetrolReadingController.createPetrolReading);
router.get('/last-petrol-reading', authenticate, PetrolReadingController.lastPetrolReading);
router.get('/all-start-petrol-reading', authenticate, PetrolReadingController.allStartPetrolReading);
router.post('/update-last-petrol-reading', authenticate, PetrolReadingController.updateLastPetrolReading);

//Team Controller
router.get('/manager', TeamController.manager);
router.post('/create-teams', TeamController.createTeams);
router.get('/all-manager', TeamController.allManager);
router.get('/view-manager/:id', TeamController.viewManager);
router.get('/all-manager-team/:id', TeamController.allManagerTeam);
router.get('/all-manager-member/:id', TeamController.allManagerMember);

router.get('/view-team/:id', TeamController.viewTeam);
router.get('/all-team-member/:id', TeamController.allTeamMember);

router.get('/view-member/:id', TeamController.viewMember);
router.post('/create-task', TeamController.createTask);
router.post('/update-task', TeamController.updateTask);
router.get('/all-task/:id', TeamController.allTask);

router.get('/my-today-task', TeamController.myTodayTask);
router.get('/all-my-today-task', TeamController.allMyTodayTask);

router.post('/add-task-review', TeamController.addTaskReview);

module.exports = router;