var quill = new Quill('#editor', {
    theme: 'snow'
  });


  
function toggleEditMode() {
    let bio = document.querySelector("#bio")
    let qlEditor = document.querySelector(".ql-editor")
    let editorDiv = document.querySelector("#editor-div")
    if (editorDiv.getAttribute("hidden")) {
        qlEditor.innerHTML = bio.innerHTML
        bio.setAttribute("hidden", "true")
        editorDiv.removeAttribute("hidden")
    } else {
        document.querySelector("#editor-div").setAttribute("hidden", "true")
        bio.removeAttribute("hidden")
    }

}  

function postBio() {
    let xhr = new XMLHttpRequest();
    let data = document.querySelector(".ql-editor").innerHTML
    data = encodeURI(data)
    console.log(data)
    xhr.open("POST", `/account/dashboard/profile?editBio=true&content=${data}`, true);
    
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            // Request finished. Do processing here.
        }
    }

    xhr.send(data);
    // xhr.send(new Int8Array()); 
    // xhr.send(document);

}