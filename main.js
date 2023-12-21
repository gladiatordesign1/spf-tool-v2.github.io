function addSubdomain() {
    const subdomainsContainer = document.getElementById('subdomains-container');
    const newSubdomainInput = document.createElement('input');
    newSubdomainInput.type = 'text';
    newSubdomainInput.className = 'sub_domain';
    newSubdomainInput.placeholder = 'New Subdomain..';
    subdomainsContainer.appendChild(newSubdomainInput);
}

function addSubdomain2() {
    const subdomainsContainer2 = document.getElementById('subdomains-container2');
    const newSubdomainInput2 = document.createElement('input');
    newSubdomainInput2.type = 'text';
    newSubdomainInput2.className = 'sub_domain2';
    newSubdomainInput2.placeholder = 'New include Subdomain..';
    subdomainsContainer2.appendChild(newSubdomainInput2);
}

// function handleRadioChange(selectedValue) {
//     const additionalOptionContainer = document.querySelector('.additional-option');
//     if (selectedValue === 'a:' ||selectedValue === '+a:' ) {
//         additionalOptionContainer.style.display = 'none';
//     } else {
//         additionalOptionContainer.style.display = 'block';
//     }
// }


var all = document.getElementById("new_records3");
let alldoms = "";
let generated_doms_include = '';
let dom = "";
let sub = "";
let res = "";
function processDomains() {
    // const inputDomains = document.getElementById('domains').value.split('\n').map(domain => domain.trim());
    let inputDomains = document.getElementById('domains').value.split('\n').map(domain => domain.trim());
    inputDomains = inputDomains.filter(domain => domain !== '');
    inputDomains = [...new Set(inputDomains)];

    const spf_domain = document.getElementById('spf_domain').value;
    const sub_domains = document.querySelectorAll('.sub_domain');
    const groupSize = parseInt(document.getElementById('groupSize').value, 10);
    const allType = document.getElementById('allType').value;
    const ipClassInput = document.getElementById('ipClass');
    const ipClass = ipClassInput ? ipClassInput.value : '';
    const selectedRadio = document.querySelector('input[name="switch"]:checked');
    const finalRS = document.querySelector('.final');
    let aPart = '';
    const cls = document.querySelector('.box-close');
    if (!inputDomains || !spf_domain ||
        Array.from(sub_domains).some(sub_domain => !sub_domain.value.trim())
    ) {
        showAlert('Please fill in all required fields.');
        return;
    }

    if (ipClassInput && !ipClassInput.checkValidity()) {
        showAlert('Please enter a valid IP class (e.g., 8)');
        return;
    }

    // if ((selectedRadio && (selectedRadio.id === 'ip4' || selectedRadio.id === '+ip4')) && !ipClass) {
    //     showAlert('Please enter IP class for ip4 or +ip4');
    //     return;
    // }

    if (Array.from(sub_domains).some(sub_domain => !sub_domain.value.trim())) {
        showAlert('Please fill in all subdomains.');
        return;
    }
 

    let result = '';
    let generated_doms = '';

    var cc = document.getElementById("inc");

    aPart = selectedRadio.id;
    for (let i = 0, count = 1; i < inputDomains.length; i += groupSize, count++) {
        const domainGroup = inputDomains.slice(i, i + groupSize);

        if (domainGroup.length === 0) {
            continue;
        }

        if (i > 0) {
            result += '\n';
        }

        let subdomainsString = '';

        if (sub_domains.length > 0) {
            sub_domains.forEach((sub_domain, index) => {
                if (index > 0) {
                    subdomainsString += '.';
                }
                subdomainsString += `${sub_domain.value}${count}`;
            });
        }

       
        if (!!ipClass) {
            result += `${subdomainsString}.${spf_domain},v=spf1${domainGroup.map(domain => ` ${aPart}${domain}/${ipClass}`).join('')} ${allType} \n`;
            generated_doms += `${subdomainsString}.${spf_domain}\n`;
            generated_doms_include += `include:${subdomainsString}.${spf_domain}\n`;
			dom = spf_domain;
			
        }
		//sub = `${sub_domain.value}`;
        else {
            result += `${subdomainsString}.${spf_domain},v=spf1${domainGroup.map(domain => ` ${aPart}${domain}`).join('')} ${allType} \n`;
            generated_doms += `${subdomainsString}.${spf_domain}\n`;
            generated_doms_include += `include:${subdomainsString}.${spf_domain}\n`;
			dom = spf_domain;
			// sub = `${sub_domain.value}`;
        }
        res = result;

    }

    document.getElementById('result').value = result;

    finalRS.style.display = 'block';
    updateGeneratedDomains(generated_doms);
    updateGeneratedDomainsInc2(generated_doms_include);
    inc.textContent = `With include: ${generated_doms.split('\n').filter(line => line.trim() !== '').length}`;

    alldoms = generated_doms;

}
document.querySelector('.box-close').addEventListener('click', function () {
    const elementToHide = document.querySelector('.modal');

    elementToHide.style.visibility = 'hidden';
    elementToHide.style.opacity = '0';
});

const pop = document.querySelector('.modal');
function show() {
    pop.style.visibility = 'visible';
    pop.style.opacity = '1';
}
function updateGeneratedDomains(generatedDomains) {
    const newRecordsTextarea = document.getElementById('new_records');
    newRecordsTextarea.value = generatedDomains;

}
function updateGeneratedDomainsInc2(generated_doms_include) {

    const newRecordsTextarea2 = document.getElementById('new_records2');

    //newRecordsTextarea2.value = generated_doms_include;
}

function showAlert(message) {
    $('.custom-alert').addClass("show");
    $('.custom-alert').removeClass("hide");
    $('.custom-alert').addClass("showAlert");
    $('.custom-alert .msg').text(message);
    setTimeout(function () {
        $('.custom-alert').removeClass("show");
        $('.custom-alert').addClass("hide");
    }, 5000);
}

$('.close-btn').click(function () {
    $('.custom-alert').removeClass("show");
    $('.custom-alert').addClass("hide");
});

$('.alert-button').click(function () {
    showAlert('This is a custom alert message.');
});




// chang
document.addEventListener('focusin', function (event) {
    if (event.target.tagName.toLowerCase() === 'input' || event.target.tagName.toLowerCase() === 'textarea') {
        event.target.style.transition = 'background 0.3s ease-in-out';
        event.target.style.background = 'linear-gradient(to bottom, #2c2c2c, #252525)';
    }
});

document.addEventListener('focusout', function (event) {
    if (event.target.tagName.toLowerCase() === 'input' || event.target.tagName.toLowerCase() === 'textarea') {
        event.target.style.transition = '';
        event.target.style.background = '';
    }
});

// change

function copyToClipboard(elementId, tooltipSelector) {
    const textarea = document.getElementById(elementId);
    textarea.select();
    document.execCommand('copy');

    const tooltip = document.querySelector(tooltipSelector);
    tooltip.textContent = tooltip.getAttribute('data-text-end');

    setTimeout(function () {
        tooltip.textContent = tooltip.getAttribute('data-text-initial');
    }, 2000);
}

document.querySelector('.copy.new-records').addEventListener('click', function () {
    copyToClipboard('new_records', '.tooltip');
});
document.querySelector('.copy.new-records2').addEventListener('click', function () {
    copyToClipboard('new_records2', '.tooltip');
});
document.querySelector('.copy.new-records3').addEventListener('click', function () {
    copyToClipboard('new_records3', '.tooltip');
});
document.querySelector('.copy.result').addEventListener('click', function () {
    copyToClipboard('result', '.tooltip');
});



function showGeneratedDomsInclude() {
    var all = document.getElementById("new_records3");
    let result2 = "";
    let GDomains = generated_doms_include.split('\n').map(domain2 => domain2.trim());
    GDomains = GDomains.filter(domain2 => domain2 !== '');
    GDomains = [...new Set(GDomains)];
const subd = document.getElementById('sub_domain1').value;
    // Divide GDomains into chunks of 10
    const chunkSize = 10;
    const chunkSize2 = 10;
    // for (let i = 0; i < GDomains.length; i += chunkSize) {
    //     const chunk = GDomains.slice(i, i + chunkSize);
    //     all.value = chunk.join('\n');  // Update the textarea for each chunk

      
    // } 
    let generated_doms2 ="";
    let generated_doms3 ="";
    let spf_domain="";
    for (let i = 0, count = 1; i < GDomains.length; i += chunkSize, count++) {
        const domainGroup2 = GDomains.slice(i, i + chunkSize);

         if (domainGroup2.length === 0) {
            continue;
         }

       if (i > 0) {
            result2 += '\n';
        }  
		
        let allType="-all";
        let aPart="a:";
		const main8sub = document.querySelectorAll('.sub_domain');
        result2 += `${subd}0${count}.${dom},v=spf1${domainGroup2.map(domain2 => ` ${domain2}`).join('')} ${allType} \n`;
        generated_doms2 += `include:${subd}0${count}.${dom}\n`;
          
     }
     let h =generated_doms2.trim().replace(/\n/g, ' ');
     
    
    let r =document.getElementById('result').value;
	document.getElementById('result').value ="All records are updated you can find it bellow in (All IN ONE) section ..GOOD LUCK!";
    // let r = "test";
	all.value = `-----ALL RECORDS----\n`+`${subd}.${dom},v=spf1 ${h} -all\n\n${result2}\n`+`\n---------\n`+r;
    setTimeout(function () {
        var pop = document.querySelector('.modal');
        pop.style.visibility = 'hidden';
        pop.style.opacity = '0';
    }, 1000);
}
