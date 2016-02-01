function check() {
	var num = parseInt(document.forms[0].text1.value);
	if (num % 2 == 0) {
		alert(num + " is even.");	// even
	}
	else {
		alert(num + " is odd");	// odd
	}
}

