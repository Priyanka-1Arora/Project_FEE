var Comment = function (cmnt,id,name) {
    this.cmnt = cmnt;
    this.id = id;
    this.name=name
  };
let cmnts=[]
let g={
    cmnt:"It is a good product.I have used it and got a good experience",
    name:"Priyanka"
}
localStorage.setItem(1,JSON.stringify(g))
let k={
    cmnt:"It is not a good product.I have used it and don't got a good experience",
    name:"Jyoti"
}
function dlt(o){
    let str=o.innerHTML.trim().charAt(o.innerHTML.length-1);
    console.log(str)
    localStorage.removeItem(Number(str));
    cmnts=[];
    renderData(cmnts)
}
function edit(o){

}
localStorage.setItem(2,JSON.stringify(k))
let j=localStorage.length+1;
function getAllCmnts(cmnts){
    var dataRows=cmnts.map((item)=>{
        return `
        <div class="row mb-3 mx-auto" style="background-color:bisque;border-radius:25px">
        <h5 class="p-4">UserName:${item.name}</h5>
        <h5 class="pb-4 px-4">Id:${item.id}</h5>
        <p class="pb-4 px-4 mx-0">${item.cmnt}</p>
        <button class="btn-primary mx-4 mb-4 mnt-2" onclick="dlt(this.previousElementSibling.previousElementSibling)" style="height:80px;width:200px;border-radius:20px">Delete Comment</button>
        <button class=" btn-primary mx-4 mb-4 mnt-2" onclick="edit" data-bs-toggle="modal" data-bs-target="#editModal" style="height:80px;width:200px;border-radius:20px">Edit Comment</button>
        </div>
        `
    })
    return dataRows.join("");
}
function submitComment() {
    let userName = document.getElementById("userName").value;
    let userComment = document.getElementById("userComment").value;

    if (userName && userComment) {
        let obj = {
            cmnt: userComment,
            name: userName
        };
        localStorage.setItem(j, JSON.stringify(obj));
        cmnts = [];
        userName.value=""
        userComment.value=""
        console.log('After clearing:', userName.value, userComment.value)
        renderData(cmnts);
        let form=document.getElementById("aform")
        form.reset();
        j+=1;
        $('#commentModal').modal('hide');
    }
}
function sorted() {
    var sortedCmnts = cmnts.sort(
      (a, b) => a.id - b.id
    );
    renderCmnts(sortedCmnts);
}
function renderData(cmnts) {
    for(let i=0;i<localStorage.length;i++){
        let k=localStorage.key(i);
        let obj=JSON.parse(localStorage.getItem(k));
        cmnts.push(new Comment(obj.cmnt,k,obj.name))
    }
    window.document.getElementById("contain").innerHTML = `
    <div class="row mt-3">
            <div class="col-sm-2 col-lg-4 col-md-6">
                <img class="img-fluid img" src="https://www.boat-lifestyle.com/cdn/shop/products/product-Image.png?v=1625813323">
            </div>
            <div class="col-sm-6 col-lg-6 mt-5">
                <h1 class="text-start">boAT Airdopes 101</h1></a>
                <button class="btn-primary btn mb-3" data-bs-toggle="modal" data-bs-target="#commentModal">Add Comments</button>
                <button class="btn-primary btn mb-3" onclick="sorted()">Sort Comments</button>
            </div>
    </div>
    ${getAllCmnts(cmnts)}`;
}
function renderCmnts(cmnt){
    window.document.getElementById("contain").innerHTML = `
    <div class="row mt-3">
            <div class="col-sm-2 col-lg-4 col-md-6">
                <img class="img-fluid img" src="https://www.boat-lifestyle.com/cdn/shop/products/product-Image.png?v=1625813323">
            </div>
            <div class="col-sm-6 col-lg-6 mt-5">
                <h1 class="text-start">boAT Airdopes 101</h1></a>
                <button class="btn-primary btn mb-3" onclick="Add()"data-bs-toggle="modal" data-bs-target="#commentModal">Add Comments</button>
                <button class="btn-primary btn mb-3" onclick="sorted()">Sort Comments</button>
            </div>
    </div>
    ${getAllCmnts(cmnt)}`;
}
renderData(cmnts)
$(document).ready(function() {
    new bootstrap.Modal(document.getElementById('commentModal'));
});
$(document).ready(function() {
    new bootstrap.Modal(document.getElementById('editModal'));
});
function Add(){
    $('#commentModal').modal('show'); // Show the modal
}
function edit(event){
    $('#editModal').modal('show');
}

function editChanges(o){
    console.log(o)
}

// Rest of your code remains the same...
