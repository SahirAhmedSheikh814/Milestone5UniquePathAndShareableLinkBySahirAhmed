var _a;
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get form elements
    var nameElement = document.getElementById('name');
    var emailElement = document.getElementById('email');
    var contactElement = document.getElementById('contact');
    var addressElement = document.getElementById('address');
    var nationalityElement = document.getElementById('nationality');
    var educationElement = document.getElementById('education');
    var experienceElement = document.getElementById('experience');
    var skillsElement = document.getElementById('skills');
    var profilePictureElement = document.getElementById('profilePicture');
    var usernameElement = document.getElementById("username");
    if (nameElement && emailElement && contactElement && addressElement && nationalityElement && educationElement && experienceElement && usernameElement && skillsElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var contact = contactElement.value;
        var address = addressElement.value;
        var nationality = nationalityElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var username = usernameElement.value;
        var skills = skillsElement.value;
        var uniquePath_1 = "resumes/".concat(username.replace(/\s+/g, '_'), "_cv.html");
        // Create resume output
        var resumeOutput_1 = "\n            <h2>Resume</h2>\n            <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">".concat(name_1, "</span></p>\n            <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n            <p><strong>Contact Number:</strong> <span id=\"edit-contact\" class=\"editable\">").concat(contact, "</span></p>\n            <p><strong>Address:</strong> <span id=\"edit-address\" class=\"editable\">").concat(address, "</span></p>\n            <p><strong>Nationality:</strong> <span id=\"edit-nationality\" class=\"editable\">").concat(nationality, "</span></p>\n\n            <h3>Education</h3>\n            <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n\n            <h3>Experience</h3>\n            <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n\n            <h3>Skills</h3>\n            <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n        ");
        // Handle profile picture
        if (profilePictureElement && profilePictureElement.files && profilePictureElement.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var imageDataUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                resumeOutput_1 = "\n                    <div class=\"profilePictureContainer\">\n                        <img src=\"".concat(imageDataUrl, "\" class=\"profilePicture\" alt=\"Profile Picture\">\n                    </div>\n                    ").concat(resumeOutput_1, "\n                ");
                var resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput_1;
                    addDownloadAndShareButtons(resumeOutput_1, uniquePath_1);
                }
                enableEditing(); // Call enableEditing function after the resume output is updated
            };
            reader.readAsDataURL(profilePictureElement.files[0]);
        }
        else {
            var resumeOutputElement = document.getElementById('resumeOutput');
            if (resumeOutputElement) {
                resumeOutputElement.innerHTML = resumeOutput_1;
                addDownloadAndShareButtons(resumeOutput_1, uniquePath_1);
            }
            enableEditing(); // Call enableEditing function if there's no profile picture
        }
    }
    else {
        console.error('One or more form elements are missing');
    }
});
function addDownloadAndShareButtons(resumeOutput, uniquePath) {
    // Create download link (Print button for PDF)
    var printButton = document.createElement('button');
    printButton.textContent = 'Download your Resume as PDF';
    printButton.classList.add('button');
    printButton.addEventListener('click', function () {
        var newWindow = window.open('', '', 'width=800,height=600');
        newWindow === null || newWindow === void 0 ? void 0 : newWindow.document.write("\n            <html>\n                <head><title>Resume</title></head>\n                <body>".concat(resumeOutput, "</body>\n            </html>\n        "));
        newWindow === null || newWindow === void 0 ? void 0 : newWindow.document.close();
        newWindow === null || newWindow === void 0 ? void 0 : newWindow.focus();
        newWindow === null || newWindow === void 0 ? void 0 : newWindow.print();
    });
    // Create share link
    var shareLink = document.createElement('a');
    shareLink.href = "resumes/".concat(uniquePath);
    shareLink.textContent = 'Share your Resume';
    shareLink.classList.add('button');
    // Append buttons to the resume output
    var resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        var buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(printButton);
        buttonContainer.appendChild(shareLink);
        resumeOutputElement.appendChild(buttonContainer);
    }
}
function enableEditing() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            // Replace content
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus(); // Call focus method to set cursor position
            }
        });
    });
}
