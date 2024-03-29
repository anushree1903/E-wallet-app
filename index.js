document.querySelector('#ewallet-form').addEventListener('submit', function (e) 
{
  e.preventDefault(); 
  console.log('form submitted');

  const type = document.querySelector('.add__type').value;
  const desc = document.querySelector('.add__description').value;
  const value = document.querySelector('.add__value').value;






  //if the description and value is not empty then add the items  to the list
  if(desc.length>0 && value.length>0){
    addItems(type, desc, value);
    resetForm();

  }
});





showItems();
function showItems(){
  let items = getItemsfromLS();

  const collection = document.querySelector('.collection');

  for(let item of items){


    const newHtml = `
    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${item.desc}</p>
      </div>
      <div class="item-time">
        <p>${item.time}</p>
      </div>
    </div>
    <div class="item-amount ${item.type === '+' ? 'income-amount':'expense-amount'} ">
      <p>${item.type}$${sep(item.value)}</p>
    </div>
    </div>
      
      `;
      collection.insertAdjacentHTML('afterbegin', newHtml);

  }
}





function addItems(type, desc, value) { 
  const time = getFormattedTime();
  
  const newHtml = `
  
<div class="item">
<div class="item-description-time">
  <div class="item-description">
    <p>${desc}</p>
  </div>
  <div class="item-time">
    <p>${time}</p>
  </div>
</div>
<div class="item-amount ${type === '+' ? 'income-amount':'expense-amount'} ">
  <p>${type}$${sep(value)}</p>
</div>
</div>
  
  `;
  console.log(newHtml);


  const collection = document.querySelector('.collection');
  collection.insertAdjacentHTML('afterbegin', newHtml);

  


  //add the items to the local storage

  addItemToLS(type,desc,value,time);
  showTotalExpense();
  showTotalIncome();
  showTotalBalance();

};



//once submit is clicked the previous data is cleared

function resetForm() {
document.querySelector('.add__type').value= '+';
  document.querySelector('.add__description').value='';
 document.querySelector('.add__value').value='';
};





function getItemsfromLS() {
  let items = localStorage.getItem('items');
  if(items){
    items = JSON.parse(items);
  }
  else{
    items = [];
  }

  return items;
}


function addItemToLS(type,desc,value,time) {

  let items = getItemsfromLS();
  items.push({type,desc,value,time});
  localStorage.setItem('items', JSON.stringify(items));
}


showTotalIncome();
function showTotalIncome() {
  let items = getItemsfromLS();
  let totalIncome = 0;
  for(let item of items){
    if(item.type === '+'){
      totalIncome += parseInt(item.value);
    }
  }
  console.log(totalIncome);
  document.querySelector('.income__amount p').innerText = `$${sep(totalIncome)}`;

}

showTotalExpense();
function showTotalExpense() {
  let items = getItemsfromLS();
  let totalExpense = 0;
  for(let item of items){
    if(item.type === '-'){
      totalExpense += parseInt(item.value);
    }
  }
  console.log(totalExpense);
  document.querySelector('.expense__amount p').innerText = `$${sep(totalExpense)}`;

}

showTotalBalance();
function showTotalBalance() {
  let items = getItemsfromLS();
  let totalBalance = 0;
  for(let item of items){
    if(item.type === '+'){
      totalBalance += parseInt(item.value);
    }
    else{
      totalBalance -= parseInt(item.value);
    }
  }

  document.querySelector('.balance__amount p').innerText = sep(totalBalance);

  if(totalBalance>=0){
    document.querySelector('header').className = 'green';

  }else{
    document.querySelector('header').className = 'red';

  }


}
 function sep(amount){
  amount = parseInt(amount);
  return amount.toLocaleString();
 }



//to get the formatted date and time
function getFormattedTime() {
const now = new Date().toLocaleTimeString('en-us', {
month:'short', 
day:'numeric',
hour:'2-digit',
minute:'2-digit'
});

const date = now.split(',')[0].split(' ');
const time = now.split(',')[1];
return `${date[1]} ${date[0]}, ${time} `;

}















