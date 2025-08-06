let optionsButtons =Document.querySelectorAll(".option-button");
let advanceOptionButton =document.querySelectorAll(".adv-option-button");
let fontName =document.getElementById("fontName");
let fontSizeRef =document.getElementById("fontSize");
let writingArea =document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButton = document.querySelectorAll(".align");
let spacingButton = document.querySelectorAll("spacing");
let formatButtons = document.querySelectorAll("format");
let scriptButtons = document.querySelectorAll(".script")


//list

let fontlist = ["Arial", "Verdana","Times New Roman","Garamod","Georgia","Couries New"]

//initaial seting

const initializer =() =>{

    //functtion calls for highlighting buttons 
    //no highlights for links, unlinks,list , undo ,redo since they are ine thime operations
    highlighter(alignButton,true);
     highlighter(spacingButton,true);
      highlighter(formatButtons,false);
       highlighter(scriptButtons,true);

    

//create option for font names
fontlist.map(value =>{
    let option = document.createElement("options");
    option.value =value;
    option.innerHTML = value;
    fontName.appendChild(option);
});
//fontSIze allows only till 7
for(let i = 1; i<=7; i++){
    let option =document.createElement("option");
    option.value =i;
    option.innerHTML =i;
    fontSizeRef.appendChild(option);
}

//default size
fontSizeRef.value =3;

};


//main logic
const modifyText = (command,defaultUi,value) =>{
    //execCommand execute command on selected text
    document.execCommand(command,defaultUi,value);
};

//for basic operations which don't need value parameter

optionsButtons.forEach((button)=>{
    button.addEventListener("click",() =>{
        modifyText(button.id, false, null);
    });
});

//options that require value parameter (e.g colors,fonts)

advanceOptionButton.forEach((button) =>{
    button.addEventListener("change",() =>{
        modifyText(button.id, false,button.value);
    });
});

//link

linkButton.addEventListener("click",()=>{
    let userLink =prompt("Enter a URL");
    //if link has http then pass directly else

        if(/http/i.test(userLink)){
            modifyText(linkButton.id,false,userLink);
        }
        else{
            userLink = "http://"+userLink;
            modifyText(linkButton.id,false,userLink);
        }
})


// highlits click buttons
const highlighter =(className,needsRemoval)=>{
    className.forEach((button) => {
        button.addEventListener("click", ()=>{
            //needRemoval = true means only one button should be highlight  and other would be normal

            if(needsRemoval){
                let alreadyActive = false;

                //if currently clicked button is already active
                if(button.classList.contains("active")){
                    alreadyActive =true;
                }

                //Remove highlight from other buttons
                highlighterRemover(className);
                if(!alreadyActive){
                    //highlight clicked button
                    button.classList.add("active");
                }
            }
            else{
                //if other buttons can be highighted
                button.classList.toggle("active");
            }
        });
    });
};

const highlighterRemover = (className) =>{
    className.forEach((button) =>{
        button.classList.remove("active");
    });
};

window.onload = initializer();