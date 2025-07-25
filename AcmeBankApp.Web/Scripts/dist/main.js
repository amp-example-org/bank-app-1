/**
 * Pre-built Angular 7 Banking Application
 * This represents the compiled output that would be committed to source control
 * in a legacy 2018-2019 development environment
 */

// Legacy: Global namespace pollution common in 2018 Angular builds
var AcmeBankingApp = (function() {
    'use strict';

    // Application state
    var appState = {
        currentUser: null,
        accounts: [],
        selectedAccount: null,
        transactions: [],
        currentView: 'dashboard'
    };

    // Legacy: Direct DOM manipulation mixed with component patterns
    function initializeApp() {
        console.log('AcmeBankingApp v1.0 - Angular 7 Legacy Build');
        
        // Get user data from global variable set by .NET
        if (window.AcmeBankApp && window.AcmeBankApp.user) {
            appState.currentUser = window.AcmeBankApp.user;
            loadUserData();
        }
        
        setupNavigation();
        showDashboard();
    }

    function loadUserData() {
        // Load accounts
        fetch(window.AcmeBankApp.apiBase + 'GetAccounts')
            .then(function(response) { return response.json(); })
            .then(function(data) {
                if (data.success) {
                    appState.accounts = data.data;
                    renderAccounts();
                }
            })
            .catch(function(error) {
                console.error('Failed to load accounts:', error);
                showError('Failed to load account information');
            });
    }

    function setupNavigation() {
        var nav = document.createElement('nav');
        nav.className = 'navbar navbar-default banking-nav';
        nav.innerHTML = `
            <div class="container-fluid">
                <ul class="nav navbar-nav">
                    <li><a href="#" data-view="dashboard">📊 Dashboard</a></li>
                    <li><a href="#" data-view="accounts">🏦 Accounts</a></li>
                    <li><a href="#" data-view="transfer">💸 Transfer</a></li>
                    <li><a href="#" data-view="billpay">💳 Bill Pay</a></li>
                    <li><a href="#" data-view="profile">👤 Profile</a></li>
                    <li><a href="#" data-view="calculator">🧮 Loan Calculator</a></li>
                </ul>
            </div>
        `;
        
        // Legacy: Event delegation with jQuery
        $(nav).on('click', 'a[data-view]', function(e) {
            e.preventDefault();
            var view = $(this).data('view');
            showView(view);
        });
        
        $('#angular-app').prepend(nav);
    }

    function showView(viewName) {
        appState.currentView = viewName;
        $('.nav a').removeClass('active');
        $('.nav a[data-view="' + viewName + '"]').addClass('active');
        
        var content = $('#main-content');
        if (!content.length) {
            content = $('<div id="main-content" class="container-fluid"></div>');
            $('#angular-app').append(content);
        }
        
        switch(viewName) {
            case 'dashboard': showDashboard(); break;
            case 'accounts': showAccounts(); break;
            case 'transfer': showTransfer(); break;
            case 'billpay': showBillPay(); break;
            case 'profile': showProfile(); break;
            case 'calculator': showLoanCalculator(); break;
            default: showDashboard();
        }
    }

    // Component: Dashboard
    function showDashboard() {
        var html = `
            <div class="row banking-dashboard">
                <div class="col-md-12">
                    <h2>Welcome back, ${appState.currentUser.fullName}!</h2>
                    <p class="text-muted">Here's your account overview</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">Account Summary</h3>
                        </div>
                        <div class="panel-body">
                            <div id="account-summary">Loading accounts...</div>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Recent Transactions</h3>
                        </div>
                        <div class="panel-body">
                            <div id="recent-transactions">Loading transactions...</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3 class="panel-title">Quick Actions</h3>
                        </div>
                        <div class="panel-body">
                            <button class="btn btn-primary btn-block" onclick="AcmeBankingApp.showView('transfer')">
                                💸 Transfer Money
                            </button>
                            <button class="btn btn-success btn-block" onclick="AcmeBankingApp.showView('billpay')" style="margin-top: 10px;">
                                💳 Pay Bills
                            </button>
                            <button class="btn btn-info btn-block" onclick="AcmeBankingApp.showView('accounts')" style="margin-top: 10px;">
                                📊 View Statements
                            </button>
                        </div>
                    </div>
                    <div class="panel panel-warning">
                        <div class="panel-heading">
                            <h3 class="panel-title">System Notice</h3>
                        </div>
                        <div class="panel-body">
                            <p><small>Scheduled maintenance: Sunday 2:00 AM - 4:00 AM</small></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('#main-content').html(html);
        
        // Load dashboard data
        if (appState.accounts.length > 0) {
            renderAccountSummary();
            loadRecentTransactions();
        }
    }

    function renderAccountSummary() {
        var totalBalance = appState.accounts.reduce(function(sum, acc) { 
            return sum + acc.Balance; 
        }, 0);
        
        var html = `
            <div class="row">
                <div class="col-md-6">
                    <h4>Total Balance</h4>
                    <h3 class="text-success">$${totalBalance.toLocaleString()}</h3>
                </div>
                <div class="col-md-6">
                    <h4>Active Accounts</h4>
                    <h3 class="text-info">${appState.accounts.length}</h3>
                </div>
            </div>
            <hr>
        `;
        
        appState.accounts.forEach(function(account) {
            html += `
                <div class="row account-row" style="margin-bottom: 10px;">
                    <div class="col-md-6">
                        <strong>${account.AccountName || account.AccountType}</strong><br>
                        <small class="text-muted">****${account.AccountNumber.slice(-4)}</small>
                    </div>
                    <div class="col-md-6 text-right">
                        <strong>$${account.Balance.toLocaleString()}</strong>
                    </div>
                </div>
            `;
        });
        
        $('#account-summary').html(html);
    }

    // Component: Accounts View
    function showAccounts() {
        var html = `
            <div class="row">
                <div class="col-md-12">
                    <h2>My Accounts</h2>
                    <div id="accounts-list">Loading accounts...</div>
                </div>
            </div>
        `;
        
        $('#main-content').html(html);
        renderAccounts();
    }

    function renderAccounts() {
        var html = '';
        
        appState.accounts.forEach(function(account) {
            html += `
                <div class="panel panel-default account-panel">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-md-8">
                                <h4>${account.AccountName || account.AccountType} Account</h4>
                                <small>Account: ****${account.AccountNumber.slice(-4)}</small>
                            </div>
                            <div class="col-md-4 text-right">
                                <h3>$${account.Balance.toLocaleString()}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body">
                        <button class="btn btn-primary btn-sm" onclick="AcmeBankingApp.viewTransactions(${account.AccountId})">
                            View Transactions
                        </button>
                        <button class="btn btn-success btn-sm" onclick="AcmeBankingApp.startTransfer(${account.AccountId})">
                            Transfer From
                        </button>
                    </div>
                    <div id="transactions-${account.AccountId}" class="collapse"></div>
                </div>
            `;
        });
        
        $('#accounts-list').html(html);
    }

    function viewTransactions(accountId) {
        var container = $('#transactions-' + accountId);
        
        if (container.hasClass('in')) {
            container.collapse('hide');
            return;
        }
        
        container.html('<p>Loading transactions...</p>').collapse('show');
        
        // Legacy fetch without proper error handling
        fetch(window.AcmeBankApp.apiBase + 'GetTransactions?accountId=' + accountId)
            .then(function(response) { return response.json(); })
            .then(function(data) {
                if (data.success) {
                    renderTransactions(data.data, container);
                }
            });
    }

    function renderTransactions(transactions, container) {
        var html = '<table class="table table-striped"><thead><tr><th>Date</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead><tbody>';
        
        transactions.forEach(function(tx) {
            var amount = tx.FromAccountId === appState.selectedAccount ? '-$' + tx.Amount : '+$' + tx.Amount;
            var amountClass = tx.FromAccountId === appState.selectedAccount ? 'text-danger' : 'text-success';
            
            html += `
                <tr>
                    <td>${new Date(tx.TransactionDate).toLocaleDateString()}</td>
                    <td>${tx.Description || tx.TransactionType}</td>
                    <td class="${amountClass}">${amount}</td>
                    <td><span class="label label-${tx.Status === 'Completed' ? 'success' : 'warning'}">${tx.Status}</span></td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
        container.html(html);
    }

    // Component: Transfer Money
    function showTransfer() {
        var html = `
            <div class="row">
                <div class="col-md-8">
                    <h2>Transfer Money</h2>
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form id="transfer-form">
                                <div class="form-group">
                                    <label>From Account</label>
                                    <select class="form-control" id="from-account" required>
                                        <option value="">Select account...</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>To Account</label>
                                    <select class="form-control" id="to-account" required>
                                        <option value="">Select account...</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Amount</label>
                                    <div class="input-group">
                                        <span class="input-group-addon">$</span>
                                        <input type="number" class="form-control" id="amount" step="0.01" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Description (Optional)</label>
                                    <input type="text" class="form-control" id="description" maxlength="200">
                                </div>
                                <button type="submit" class="btn btn-primary">Transfer Money</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3 class="panel-title">Transfer Limits</h3>
                        </div>
                        <div class="panel-body">
                            <p>Daily limit: $${window.AcmeBankApp.config.maxTransferAmount.toLocaleString()}</p>
                            <p>Transfers are processed immediately between your accounts.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('#main-content').html(html);
        populateAccountDropdowns();
        
        // Legacy form handling
        $('#transfer-form').on('submit', function(e) {
            e.preventDefault();
            submitTransfer();
        });
    }

    function populateAccountDropdowns() {
        var options = '';
        appState.accounts.forEach(function(account) {
            options += `<option value="${account.AccountId}">${account.AccountName || account.AccountType} - $${account.Balance.toLocaleString()}</option>`;
        });
        
        $('#from-account, #to-account').append(options);
    }

    function submitTransfer() {
        var transferData = {
            FromAccountId: parseInt($('#from-account').val()),
            ToAccountId: parseInt($('#to-account').val()),
            Amount: parseFloat($('#amount').val()),
            Description: $('#description').val()
        };
        
        // Legacy: No CSRF token
        $.post(window.AcmeBankApp.apiBase + 'Transfer', transferData)
            .done(function(response) {
                if (response.success) {
                    alert('Transfer completed successfully!');
                    showView('dashboard');
                } else {
                    alert('Transfer failed: ' + response.error);
                }
            })
            .fail(function() {
                alert('Transfer failed. Please try again.');
            });
    }

    // Component: Bill Pay
    function showBillPay() {
        var html = `
            <div class="row">
                <div class="col-md-12">
                    <h2>💳 Pay Bills</h2>
                    <div class="alert alert-info">
                        <strong>Coming Soon!</strong> Our bill payment feature is currently under development.
                        <br>For now, please use online banking or visit a branch to pay bills.
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Popular Payees</h3>
                        </div>
                        <div class="panel-body">
                            <ul class="list-group">
                                <li class="list-group-item">⚡ Electric Company <span class="badge">Not Available</span></li>
                                <li class="list-group-item">💧 Water Utility <span class="badge">Not Available</span></li>
                                <li class="list-group-item">🏠 Mortgage Company <span class="badge">Not Available</span></li>
                                <li class="list-group-item">📱 Phone Company <span class="badge">Not Available</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('#main-content').html(html);
    }

    // Component: Profile Management
    function showProfile() {
        var html = `
            <div class="row">
                <div class="col-md-8">
                    <h2>My Profile</h2>
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <div id="profile-form">Loading profile...</div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="panel panel-warning">
                        <div class="panel-heading">
                            <h3 class="panel-title">Security Notice</h3>
                        </div>
                        <div class="panel-body">
                            <p>Never share your login credentials with anyone.</p>
                            <p>Acme Bank will never ask for your password via email or phone.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('#main-content').html(html);
        loadProfile();
    }

    function loadProfile() {
        fetch(window.AcmeBankApp.apiBase + 'GetProfile')
            .then(function(response) { return response.json(); })
            .then(function(data) {
                if (data.success) {
                    renderProfileForm(data.data);
                }
            });
    }

    function renderProfileForm(profile) {
        var html = `
            <form id="profile-update-form">
                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" id="firstName" value="${profile.FirstName || ''}" required>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" id="lastName" value="${profile.LastName || ''}" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" id="email" value="${profile.Email || ''}" required>
                </div>
                <div class="form-group">
                    <label>Security Question</label>
                    <input type="text" class="form-control" id="securityQuestion" value="${profile.SecurityQuestion || ''}">
                </div>
                <div class="form-group">
                    <label>Security Answer</label>
                    <input type="text" class="form-control" id="securityAnswer" value="${profile.SecurityAnswer || ''}">
                </div>
                <button type="submit" class="btn btn-primary">Update Profile</button>
            </form>
        `;
        
        $('#profile-form').html(html);
        
        $('#profile-update-form').on('submit', function(e) {
            e.preventDefault();
            updateProfile();
        });
    }

    function updateProfile() {
        var profileData = {
            FirstName: $('#firstName').val(),
            LastName: $('#lastName').val(),
            Email: $('#email').val(),
            SecurityQuestion: $('#securityQuestion').val(),
            SecurityAnswer: $('#securityAnswer').val()
        };
        
        $.post(window.AcmeBankApp.apiBase + 'UpdateProfile', profileData)
            .done(function(response) {
                if (response.success) {
                    alert('Profile updated successfully!');
                } else {
                    alert('Failed to update profile: ' + response.error);
                }
            });
    }

    // Component: Loan Calculator
    function showLoanCalculator() {
        var html = `
            <div class="row">
                <div class="col-md-8">
                    <h2>🧮 Loan Calculator</h2>
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <form id="loan-calculator-form">
                                <div class="form-group">
                                    <label>Loan Amount</label>
                                    <div class="input-group">
                                        <span class="input-group-addon">$</span>
                                        <input type="number" class="form-control" id="loanAmount" value="200000" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Interest Rate (%)</label>
                                    <input type="number" class="form-control" id="interestRate" value="4.5" step="0.01" required>
                                </div>
                                <div class="form-group">
                                    <label>Loan Term (Years)</label>
                                    <input type="number" class="form-control" id="loanTerm" value="30" required>
                                </div>
                                <button type="button" class="btn btn-primary" onclick="AcmeBankingApp.calculateLoan()">
                                    Calculate Payment
                                </button>
                            </form>
                            <div id="loan-results" style="margin-top: 20px;"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <h3 class="panel-title">Current Rates</h3>
                        </div>
                        <div class="panel-body">
                            <p><strong>30-Year Fixed:</strong> 4.5%</p>
                            <p><strong>15-Year Fixed:</strong> 4.0%</p>
                            <p><strong>5/1 ARM:</strong> 3.8%</p>
                            <p><small>*Rates subject to change. Contact us for current rates.</small></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('#main-content').html(html);
    }

    function calculateLoan() {
        var amount = parseFloat($('#loanAmount').val());
        var rate = parseFloat($('#interestRate').val()) / 100 / 12;
        var term = parseInt($('#loanTerm').val()) * 12;
        
        var payment = (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
        var totalInterest = (payment * term) - amount;
        
        var html = `
            <div class="panel panel-success">
                <div class="panel-heading">
                    <h3 class="panel-title">Loan Calculation Results</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h4>Monthly Payment</h4>
                            <h3 class="text-success">$${payment.toFixed(2)}</h3>
                        </div>
                        <div class="col-md-6">
                            <h4>Total Interest</h4>
                            <h3 class="text-info">$${totalInterest.toFixed(2)}</h3>
                        </div>
                    </div>
                    <hr>
                    <p><strong>Total Amount Paid:</strong> $${(amount + totalInterest).toFixed(2)}</p>
                </div>
            </div>
        `;
        
        $('#loan-results').html(html);
    }

    function loadRecentTransactions() {
        if (appState.accounts.length > 0) {
            var firstAccount = appState.accounts[0];
            fetch(window.AcmeBankApp.apiBase + 'GetTransactions?accountId=' + firstAccount.AccountId)
                .then(function(response) { return response.json(); })
                .then(function(data) {
                    if (data.success) {
                        renderRecentTransactions(data.data.slice(0, 5));
                    }
                });
        }
    }

    function renderRecentTransactions(transactions) {
        var html = '<table class="table table-striped"><thead><tr><th>Date</th><th>Description</th><th>Amount</th></tr></thead><tbody>';
        
        transactions.forEach(function(tx) {
            html += `
                <tr>
                    <td>${new Date(tx.TransactionDate).toLocaleDateString()}</td>
                    <td>${tx.Description || tx.TransactionType}</td>
                    <td>$${tx.Amount.toFixed(2)}</td>
                </tr>
            `;
        });
        
        html += '</tbody></table>';
        $('#recent-transactions').html(html);
    }

    function startTransfer(accountId) {
        showView('transfer');
        setTimeout(function() {
            $('#from-account').val(accountId);
        }, 100);
    }

    function showError(message) {
        var alert = `
            <div class="alert alert-danger alert-dismissible">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                <strong>Error:</strong> ${message}
            </div>
        `;
        $('#main-content').prepend(alert);
    }

    // Public API
    return {
        init: initializeApp,
        showView: showView,
        viewTransactions: viewTransactions,
        startTransfer: startTransfer,
        calculateLoan: calculateLoan
    };
})();

// Legacy: Auto-initialize when DOM is ready
$(document).ready(function() {
    AcmeBankingApp.init();
});

// Legacy: Expose to global scope for legacy compatibility
window.AcmeBankingApp = AcmeBankingApp;
