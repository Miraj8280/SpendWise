import _ from 'lodash';

// sum up the transactions type wise
export function getSum(transaction, type) {
    let sum = _(transaction)
        .groupBy("type")
        .map((obj, key) => {
            if(!type) return _.sumBy(obj, 'amount');
            return {
                'type' : key,
                'color' : obj[0].color,
                'total' : _.sumBy(obj, 'amount')
            }
        })
        .value()

    return sum;
}

export function getLabels(transaction) {
    let amountSum = getSum(transaction, 'type');
    let totalAmount = _.sum(getSum(transaction));

    // to show percentage of diff types
    let percent = _(amountSum)
                .map(obj => _.assign(obj, {percent: (100 * obj.total)/totalAmount}))
                .value()
    
    // to show amounts of diff types
    let showAmount = _(amountSum)
                .map(obj => _.assign(obj, {showAmount: obj.total}))
                .value()

    // return what want to show 
    return showAmount;
}

export function chartData(transaction, custom) {

    let bg = _.map(transaction, a => a.color);
    bg = _.uniq(bg);
    let dataValue = getSum(transaction);
    // console.log(dataValue);

    const config = {
        data:{
          datasets: [{
            data: dataValue,
            backgroundColor: bg,
            hoverOffset: 4,
            
          }]
        },
        options:{
          cutout: 107
        }
      };

      return custom ?? config;
}

export function getCurrentAmount(transaction) {
  let amountSum = getSum(transaction, 'type');

  let savingsObj = _.find(amountSum, {'type': 'Savings'});
  let expenseObj = _.find(amountSum, {'type': 'Expense'});

  let savingsAmount = savingsObj ? savingsObj.total : 0;
  let expenseAmount = expenseObj ? expenseObj.total : 0;
  
  // current amount
  let currentAmount = savingsAmount - expenseAmount;
  if(!expenseAmount) {
    currentAmount = savingsAmount;
  }

  if(currentAmount <= 0) {
      currentAmount = 0;
  }
  return currentAmount;
}






