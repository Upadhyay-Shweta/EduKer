function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    if (file) {
        var reader = new FileReader();

        reader.onload = function(event) {
            var content = event.target.result;
            // Here you have access to the file content, you can perform operations with it
            console.log("File content:", content);
            document.getElementById('status').innerText = 'File read successfully!';
        };

        reader.onerror = function(event) {
            console.error("File could not be read! Code " + event.target.error.code);
            document.getElementById('status').innerText = 'Error reading file';
        };

        // Read file as text
        reader.readAsText(file);
    } else {
        document.getElementById('status').innerText = 'Please select a file';
    }
}