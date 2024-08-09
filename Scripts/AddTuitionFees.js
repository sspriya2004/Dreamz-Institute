var partiallyPaid = '0';
var fullyPaid = '1';
let pendingAmount = document.getElementById('pendingAmount');
function displayFunction(status){
    if(status=="partiallyPaid"){
        partiallyPaid = '1';
        fullyPaid = '0';
        document.getElementById('field-visible').style.display = "block";
    }
    else{
        partiallyPaid = '0';
        fullyPaid = '1';
        pendingAmount.value = '0';
        document.getElementById('field-visible').style.display = "none";
    }
}
// var ele = document.getElementsByName('status');
// console.log(ele.value);
// for(let i=0; i<ele.length; i++){
//     if(ele[i].value=="partiallyPaid"){
//         document.getElementById('field-visible').style.display = "block";
//     }
// }
document.addEventListener('DOMContentLoaded', () => {

let formSubmit = document.getElementById('formSubmit');
let currentUsername = localStorage.getItem('currentUser');

formSubmit.addEventListener('click', async(e) => {
    e.preventDefault();
    
    let studName = document.getElementById('studName').value;
    let standard = document.getElementById('standard').value;
    let totalAmount = document.getElementById('totalAmount').value;
    let pendingAmount = document.getElementById('pendingAmount').value;
    let collectedBy = document.getElementById('collectedBy').value;
    let paymentDate = document.getElementById('paymentDate').value;
    let data = {
        currentUser : currentUsername,
        studName : studName,
        standard : standard,
        totalAmount : totalAmount,
        fullyPaid : fullyPaid,
        partiallyPaid : partiallyPaid,
        pendingAmount : pendingAmount,
        collectedBy : collectedBy,
        paymentDate : paymentDate
    }
    
    if(studName=="" || standard=="" || totalAmount=="" || pendingAmount=="" || collectedBy=="" || paymentDate==""){
        document.getElementById("form-validate").classList.add("was-validated");
    }
    else{
        try{
            const response = await axios.post('', data);
            console.log(response);
        }
        catch(error){
            console.log(error);
        }
        console.log(data);
    }
})

})