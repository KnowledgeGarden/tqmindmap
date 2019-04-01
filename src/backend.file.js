MM.Backend.File = Object.create(MM.Backend, {
	id: {value: "file"},
	label: {value: "File"},
	input: {value:document.createElement("input")}
});

//////////////////////
//SAVE TestMap.mymind {
//	"root": {
//		"id": "kayormez",
//		"text": "TestMap",
//		"layout": "map",
//		"children": [
//			{
//				"id": "rzgmikgl",
//				"text": "Something To Play With",
//				"side": "right"
//			},
//			{
//				"id": "tnboseag",
//				"text": "Something Else To Play With",
//				"side": "left"
//			},
//			{
//				"id": "jhhtbpej",
//				"text": "Another Node",
//				"side": "right"
//			}
//		]
//	}
//}
//https://stackoverflow.com/questions/8310657/how-to-create-a-dynamic-file-link-for-download-in-javascript
//////////////////////
MM.Backend.File.save = function(data, name) {
	//console.log('SAVE', name, data);
	var link = document.createElement("a");
	link.download = name;
	link.href = "data:text/plain;base64," + btoa(unescape(encodeURIComponent(data)));
	document.body.appendChild(link);
	link.click();
	link.parentNode.removeChild(link);
	// promise is here so this can return promise
	// as called in ui.backend.file.js save()
	var promise = new Promise().fulfill();
	return promise;
}

MM.Backend.File.load = function() {
	var promise = new Promise();

	this.input.type = "file";

	this.input.onchange = function(e) {
		var file = e.target.files[0];
		if (!file) { return; }
		console.log("Load", file, file.name);
		var reader = new FileReader();
		reader.onload = function() { promise.fulfill({data:reader.result, name:file.name}); }
		reader.onerror = function() { promise.reject(reader.error); }
		reader.readAsText(file);
	}.bind(this);

	this.input.click();
	return promise;
}

MM.Backend.File.boot = function(inFile) {

	var promise = new Promise();

	this.input.type = "file";

	this.input.onchange = function(e) {
		var file = "../data/nestedmaps/"+inFile;
		if (!file) { return; }
		console.log("Boot", file, file.name);

		var reader = new FileReader();
		reader.onload = function() { promise.fulfill({data:reader.result, name:file.name}); }
		reader.onerror = function() { promise.reject(reader.error); }
		reader.readAsText(file);
	}.bind(this);

	this.input.click();
	return promise;
}
