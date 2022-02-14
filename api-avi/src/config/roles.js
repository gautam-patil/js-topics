const roles = ['user', 'admin','super-admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getColors','getTransactions','manageUsers','getPackages','getHairstyles','getCategorys','getModels','getOtherApps','managePurchasedPackages','getPurchasedPackages','getRecents','manageRecents']);
roleRights.set(roles[1], ['getUsers', 'manageUsers','getColors','getTransactions','getPackages','getHairstyles','manageColors','managePackages','manageHairstyles','managePurchasedPackages','getPurchasedPackages','manageCategorys','manageModels','manageTransactions','manageOtherApps','manageTransactions','getTransactions','getCategorys','getModels','getTutorials','manageTutorials','getOtherApps','getRecents','manageRecents']);
roleRights.set(roles[2], ['getUsers', 'manageUsers','getColors','getTransactions','getPackages','getHairstyles','manageColors','managePackages','manageHairstyles','managePurchasedPackages','getPurchasedPackages','manageCategorys','manageModels','manageTransactions','manageOtherApps','manageTransactions','getTransactions','getCategorys','getModels','getOtherApps','getRecents','manageRecents']);


module.exports = { 
  roles,
  roleRights,
};
