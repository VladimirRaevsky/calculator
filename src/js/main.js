
let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;
checkSavings.disabled = true;
incomeItem.disabled = true;


function start() {
	time = +prompt ("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt ("Ваш бюджет на месяц?", "");
    
	while (isNaN(time) || time == "" || time == null) {
        time = +prompt ("Введите дату в формате YYYY-MM-DD", "");
    }
    while (isNaN(money) || money == "" || money == null) {
        money = +prompt ("Ваш бюджет на месяц?", ""); 
    }

	budgetValue.textContent = money.toFixed();
	appData.timeData = time;
	appData.budget = money;
	yearValue.value = new Date(Date.parse(time)).getFullYear();
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();


	expensesBtn.disabled = false;
	optionalExpensesBtn.disabled = false;
	countBtn.disabled = false;
	checkSavings.disabled = false;
	incomeItem.disabled = false;
}
startBtn.addEventListener('click', start);

expensesBtn.addEventListener('click', () => {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if ((typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
        expensesValue.textContent = sum;
    }
});

optionalExpensesBtn.addEventListener('click', function() {
	for (let i = 0; i <= optionalExpensesItem.length; i++) {
		let opt = optionalExpensesItem[i].value;
		appData.optionalExpenses[i] = opt;
		optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
	}
});

countBtn.addEventListener('click', function() {
	if(appData.budget != undefined) {
		appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
		dayBudgetValue.textContent = appData.moneyPerDay;

		if (appData.moneyPerDay < 100) {
			levelValue.textContent = "Это минимальный уровень достатка!";
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = "Это средний уровень достатка!";
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = "Это высокий уровень достатка!";
		} 
	}else {
		dayBudgetValue.textContent = "Ошибочка...!";
	}
});

incomeItem.addEventListener('input', function() {
	let items = incomeItem.value;
        appData.income = items.split(", ");
		incomeValue.textContent = items;
});


checkSavings.addEventListener('click', function() {
	if(appData.savings == false) {
		appData.savings = true;
	}else {
		appData.savings = false;
	}
});

sumValue.addEventListener('input', function() {
	if(appData.savings == true) {
		let sum = +sumValue.value,
            percent = +percentValue.value;

		appData.monthIncom = sum / 100 / 12 * percent;
		appData.yearIncom = sum / 100 * percent;

		monthSavingsValue.textContent = appData.monthIncom.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncom.toFixed(1);
	}
});

percentValue.addEventListener('input', function() {
	if(appData.savings == true) {
		let sum = +sumValue.value,
            percent = +percentValue.value;

		appData.monthIncom = sum / 100 / 12 * percent;
		appData.yearIncom = sum / 100 * percent;

		monthSavingsValue.textContent = appData.monthIncom.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncom.toFixed(1);
	}
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

