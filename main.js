let form =document.getElementById('form');
let itemList=document.getElementById('items');



// adding event to form 
form.addEventListener("submit" ,getValue);


// get value function
 async function getValue(event) {
    event.preventDefault();
    // getting users value of name email and phone
  let Inputname=document.getElementById('name').value;
  let email=document.getElementById('email').value;
  let phone=document.getElementById('phone').value;

    let obj={
        "name":Inputname,
        "email":email,
        "phoneNumber":phone
    };
  
   let postData=await axios.post("https://crudcrud.com/api/67333bffe151416d90af968928d4923b/value",obj)
    showUser(obj);
 }

window.addEventListener("DOMContentLoaded",async ()=>{
    let data=await axios.get("https://crudcrud.com/api/67333bffe151416d90af968928d4923b/value");
    for(let i=0;i<data.data.length;i++){
        showUser(data.data[i]);
    }    
})

 function showUser(item){
    let Inputname=item.name;
    let email=item.email;
    let phone=item.phoneNumber;
    let id=item._id;

    // creating new li
    let li=document.createElement("li");

    // creating a textNode 
    let nameNode=document.createTextNode(Inputname);
    let emailNode=document.createTextNode(email);
    let phoneNode=document.createTextNode(phone);

    // creating delete button
    let button= document.createElement('button');
    button.onclick=(event)=>removeItem(event,id);
    button.type="button";
    button.className="delete";
    button.appendChild(document.createTextNode("delete"));
    
    // creating edit button 
    let edit=document.createElement("button");
    edit.onclick=(event)=>editItem(event,id);
    edit.type="button";
    edit.className="edit";
    edit.appendChild(document.createTextNode("edit"));
    
    // appeding the text node to the li
    li.append(nameNode,emailNode,phoneNode,button,edit);
    li.appendChild(document.createElement("br"));

    // appending li to itemlist
    itemList.appendChild(li)
 }

 // function remove item
async function removeItem(event,id){
    
    if(event.target.classList.contains("delete")){
        
        let li=event.target.parentElement;
        itemList.removeChild(li);   
    }
    //    removing item from cloud 
    await axios.delete(`https://crudcrud.com/api/67333bffe151416d90af968928d4923b/value/${id}`);
}
   
// // edit item function 
async function editItem(event,id){
    if(event.target.classList.contains("edit")){
        
        let editData=await axios.get(`https://crudcrud.com/api/67333bffe151416d90af968928d4923b/value/${id}`)
        const {data}=editData;
        console.log(data);
        document.getElementById("name").value=data.name;
        document.getElementById("email").value=data.email;
        document.getElementById("phone").value=data.phoneNumber;

        let li=event.target.parentElement;
        itemList.removeChild(li); 
        
        let deleteData=await axios.delete(`https://crudcrud.com/api/67333bffe151416d90af968928d4923b/value/${id}`)
    }

    console.log(editData)
}