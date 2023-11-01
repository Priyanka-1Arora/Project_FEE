var Comment = function (cmnt,id,name) {
    this.cmnt = cmnt;
    this.id = id;
    this.name=name
};
let cmnts=[]
function dlt(o){
    console.log(o.innerHTML)
    let index=0;
    for(let i=0;i<o.innerHTML.trim().length;i++){
        if(o.innerHTML.trim().charAt(i)>='0' && o.innerHTML.trim().charAt(i)<='9'){
            index=i;
            break;
        }
    }
    let str=o.innerHTML.trim().slice(index,o.innerHTML.length)
    localStorage.removeItem(Number(str));
    cmnts=[];
    renderData(cmnts)
}
let j=localStorage.length;
function getAllCmnts(cmnts){
    var dataRows=cmnts.map((item)=>{
        return `
        <div class="row mb-3 mx-auto section-style"  >
        <h5 class="p-2 px-4 pt-3">UserName: ${item.name}</h5>
        <h5 class="pb-2 px-4">Id:${item.id}</h5>
        <p class="pb-2 px-4 mx-0">${item.cmnt}</p>
        <button class="btn-primary mx-4 mb-3 mnt-4 deletebtn" onclick="dlt(this.previousElementSibling.previousElementSibling)" style="height:60px;width:200px;border-radius:20px">Delete Comment</button>
        <button class=" btn-primary mx-4 mb-3 mnt-4" onclick="edit(this.previousElementSibling.previousElementSibling.previousElementSibling)" data-bs-toggle="modal" data-bs-target="#editModal" style="height:60px;width:200px;border-radius:20px">Edit Comment</button>
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
        do{
            j+=1;
        }while(localStorage.getItem(j));
        localStorage.setItem(j, JSON.stringify(obj));
        cmnts = [];
        userName.value=""
        userComment.value=""
        renderData(cmnts);
        let form=document.getElementById("aform")
        form.reset();
        j+=1;
        $('#commentModal').modal('hide');
    }
}
function sorted() {
    var sortedCmnts = cmnts.sort(
      (a, b) => b.id - a.id
    );
    renderCmntsSorted(sortedCmnts);
}
function getfromlocalStorage(){
    for(let i=0;i<localStorage.length;i++){
        let k=localStorage.key(i);
        let obj=JSON.parse(localStorage.getItem(k));
        cmnts.push(new Comment(obj.cmnt,k,obj.name))
    }
}
function renderData(cmnts) {
    getfromlocalStorage(cmnts)
    window.document.getElementById("contain").innerHTML = `
    <div class="row mt-3">
            <div class="col-sm-4 col-lg-4 col-md-6">
                <img class="img-fluid img1" src="https://www.boat-lifestyle.com/cdn/shop/products/product-Image.png?v=1625813323">
            </div>
            <div class="col-sm-6 col-lg-6 mt-5 col-md-3">
                <p class="text-start para">boAT Airdopes 101</p></a>
                <button class="btn-primary btn mb-3" style="padding:20px;border-radius:20px" data-bs-toggle="modal" data-bs-target="#commentModal">Add Comments</button>
                <button class="btn-primary btn mb-3" style="padding:20px;border-radius:20px" onclick="sorted()">Sort Comments</button>
            </div>
    </div>
    ${getAllCmnts(cmnts)}`;
}
function renderCmntsSorted(cmnt){
    window.document.getElementById("contain").innerHTML = `
    <div class="row mt-3">
            <div class="col-sm-4 col-lg-4 col-md-6">
                <img class="img-fluid img1" src="https://www.boat-lifestyle.com/cdn/shop/products/product-Image.png?v=1625813323">
            </div>
            <div class="col-sm-6 col-lg-6 mt-5 col-md-3">
                <p class="text-start para">boAT Airdopes 101</p></a>
                <button class="btn-primary btn mb-3" style="padding:20px;border-radius:20px" onclick="Add()"data-bs-toggle="modal" data-bs-target="#commentModal">Add Comments</button>
                <button class="btn-primary btn mb-3" style="padding:20px;border-radius:20px" onclick="sorted()">Sort Comments</button>
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
function edit(o){
    let index=0;
    for(let i=0;i<o.innerHTML.trim().length;i++){
        if(o.innerHTML.trim().charAt(i)>='0' && o.innerHTML.trim().charAt(i)<='9'){
            index=i;
            break;
        }
    }
    let str=o.innerHTML.trim().slice(index,o.innerHTML.length)
    localStorage.setItem(-1,str)
    localStorage.setItem(-2,localStorage.getItem(str));
    console.log(localStorage.getItem(-1))
    console.log(localStorage.getItem(-2))
    $('#editModal').modal('show');
}

function editChanges(o){
    let userComment = document.getElementById("useromment").value;
    console.log(userComment)
    if(userComment){
        let index=localStorage.getItem(-1);
        const obj=JSON.parse(localStorage.getItem(-2));
        const newObj={
            cmnt:userComment,
            name:obj.name
        }
        localStorage.setItem(index,JSON.stringify(newObj));
        localStorage.removeItem(-1)
        localStorage.removeItem(-2)
        cmnts=[]
        let form=document.getElementById("form2");
        form.reset();
        renderData(cmnts);
    }
    $('#editModal').modal('hide');
}
