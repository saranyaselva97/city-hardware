function addItemRow(){
    var tbody = document.getElementById("item_tbody");
    
    var elementsRow = tbody.rows[0];
    
    var itemCodeField = elementsRow.cells[0].children[0];
    var itemNameField = document.getElementById("item_name");
    var reOrderLevelField = elementsRow.cells[2].children[0];
    var sellingPriceField = elementsRow.cells[3].children[0];
    var labelPriceField = elementsRow.cells[4].children[0];
    var categoryField = elementsRow.cells[5].children[0];
    var measureUnitField = elementsRow.cells[6].children[0];
    
    var errorAlert = document.getElementById("item_error_msg");
    var errorMessageSpan = document.getElementById("error_msg");
    console.log(elementsRow.cells[0].children[0].value);
    console.log(elementsRow.cells[1].children[0].value);
    console.log(elementsRow.cells[2].children[0].value);
    console.log(elementsRow.cells[3].children[0].value);
    if(itemCodeField.value === ""){
        itemCodeField.style.border = "1px solid #ed5565";
        itemCodeField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Item Code is Required";
        
        return false;
    }else{
        itemCodeField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    console.log(itemNameField.value);
    if(itemNameField.value === ""){
        itemNameField.style.border = "1px solid #ed5565";
        itemNameField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Item Name is Required";
        
        return false;
    }else{
        itemNameField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    
    if(sellingPriceField.value === ""){
        sellingPriceField.style.border = "1px solid #ed5565";
        sellingPriceField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Selling Price is Required";
        
        return false;
    }else{
        sellingPriceField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    
    if(labelPriceField.value === ""){
        labelPriceField.style.border = "1px solid #ed5565";
        labelPriceField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Label Price is Required";
        
        return false;
    }else{
        labelPriceField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    
    if(categoryField.value === ""){
        categoryField.style.border = "1px solid #ed5565";
        categoryField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Select a Category";
        
        return false;
    }else{
        categoryField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    
    if(measureUnitField.value === ""){
        measureUnitField.style.border = "1px solid #ed5565";
        measureUnitField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Select a Measurement Unit";
        
        return false;
    }else{
        measureUnitField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    
    var rowCount = tbody.rows.length;
    
    var itemCodeText = "<input type='text' name='Item_Code"+rowCount+"' class='hdnfield' value='"+itemCodeField.value+"' readonly />";
    var itemNameText = "<input type='text' name='Item_Name"+rowCount+"' class='hdnfield' value='"+itemNameField.value+"' readonly />";
    var reOrderLevelText = "<input type='text' name='Re_Order_Level"+rowCount+"' class='hdnfield' value='"+reOrderLevelField.value+"' readonly />";
    var sellingPriceText = "<input type='text' name='Selling_Price"+rowCount+"' class='hdnfield' value='"+sellingPriceField.value+"' readonly />";
    var labelPriceText = "<input type='text' name='Label_Price"+rowCount+"' class='hdnfield' value='"+labelPriceField.value+"' readonly />";
    var categoryHidden = "<input type='hidden' name='Category"+rowCount+"' value='"+categoryField.value+"' readonly />";
    var categoryText = "<input type='text' name='Category_Text"+rowCount+"' class='hdnfield' value='"+categoryField.options[categoryField.selectedIndex].text+"' readonly />";
    var measureUnitHidden = "<input type='hidden' name='Measure_Unit"+rowCount+"' value='"+measureUnitField.value+"' readonly />";
    var measureUnitText = "<input type='text' name='Measure_Unit_Text"+rowCount+"' class='hdnfield' value='"+measureUnitField.options[measureUnitField.selectedIndex].text+"' readonly />";
    
    var removeButton = "<button type='button' class='btn btn-danger' onclick='removeRow(this.parentElement.parentElement)'><span class='fa fa-times'></span></button>"
    
    var newRow = "<tr><td>"+itemCodeText+"</td><td>"+itemNameText+"</td><td>"+reOrderLevelText+"</td><td>"+sellingPriceText+"</td><td>"+labelPriceText+"</td><td>"+categoryHidden+categoryText+"</td><td>"+measureUnitHidden+measureUnitText+"</td><td>"+removeButton+"</td></tr>";
    
    var rows = tbody.innerHTML;
    rows += newRow;
    
    tbody.innerHTML = rows;
    
    itemCodeField.focus();
    
    document.getElementById("save_item_button").style.display = "block";
    
    document.getElementById("item_row_count").value = rowCount+1;
}

function removeRow(row){
    var isRemove = confirm("Do You Want to Remove this Row?");
    if(isRemove){
        row.parentElement.removeChild(row);
    }
}

function addCustomerRow(){
    var tbody = document.getElementById("customer_tbody");
    
    var elementsRow = tbody.rows[0];
    
    var customerCodeField = elementsRow.cells[0].children[1];
    var customerNameField = elementsRow.cells[1].children[1];
    var addressField = elementsRow.cells[2].children[0];
    var ContactNoField = elementsRow.cells[3].children[0];
    
    var errorAlert = document.getElementById("item_error_msg");
    var errorMessageSpan = document.getElementById("error_msg");
    
    if(customerCodeField.value === ""){
        customerCodeField.style.border = "1px solid #ed5565";
        customerCodeField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[0].innerHTML = "Customer Code is Required";
        
        return false;
    }else{
        customerCodeField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[0].innerHTML = "";
    }
    
    if(customerNameField.value === ""){
        customerNameField.style.border = "1px solid #ed5565";
        customerNameField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Customer Name is Required";
        
        return false;
    }else{
        customerNameField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    
    var rowCount = tbody.rows.length;
    
    var customerCodeText = "<input type='text' name='Customer_Code"+rowCount+"' class='hdnfield' value='"+customerCodeField.value+"' readonly />";
    var customerNameText = "<input type='text' name='Customer_Name"+rowCount+"' class='hdnfield' value='"+customerNameField.value+"' readonly />";
    var addressText = "<input type='text' name='Address"+rowCount+"' class='hdnfield' value='"+addressField.value+"' readonly />";
    var contactNoText = "<input type='text' name='Contact"+rowCount+"' class='hdnfield' value='"+ContactNoField.value+"' readonly />";
    
    var removeButton = "<button type='button' class='btn btn-danger' onclick='removeRow(this.parentElement.parentElement)'><span class='fa fa-times'></span></button>";
    
    var newRow = "<tr><td>"+customerCodeText+"</td><td>"+customerNameText+"</td><td>"+addressText+"</td><td>"+contactNoText+"</td><td>"+removeButton+"</td></tr>";
    
    var rows = tbody.innerHTML;
    rows += newRow;
    
    tbody.innerHTML = rows;
    
    customerCodeField.focus();
    
    document.getElementById("save_customer_button").style.display = "block";
    
    document.getElementById("customer_row_count").value = rowCount+1;
}

function addSupplierRow(){
    var tbody = document.getElementById("supplier_tbody");
    
    var elementsRow = tbody.rows[0];
    
    var supplierCodeField = elementsRow.cells[0].children[0];
    var supplierNameField = elementsRow.cells[1].children[1];
    var addressField = elementsRow.cells[2].children[0];
    var ContactNoField = elementsRow.cells[3].children[0];
    
    var errorAlert = document.getElementById("item_error_msg");
    var errorMessageSpan = document.getElementById("error_msg");
    
    if(supplierCodeField.value === ""){
        supplierCodeField.style.border = "1px solid #ed5565";
        supplierCodeField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Supplier Code is Required";
        
        return false;
    }else{
        supplierCodeField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    
    if(supplierNameField.value === ""){
        supplierNameField.style.border = "1px solid #ed5565";
        supplierNameField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Supplier Name is Required";
        
        return false;
    }else{
        supplierNameField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    
    var rowCount = tbody.rows.length;
    
    var supplierCodeText = "<input type='text' name='Supplier_Code"+rowCount+"' class='hdnfield' value='"+supplierCodeField.value+"' readonly />";
    var supplierNameText = "<input type='text' name='Supplier_Name"+rowCount+"' class='hdnfield' value='"+supplierNameField.value+"' readonly />";
    var addressText = "<input type='text' name='Address"+rowCount+"' class='hdnfield' value='"+addressField.value+"' readonly />";
    var contactNoText = "<input type='text' name='Contact"+rowCount+"' class='hdnfield' value='"+ContactNoField.value+"' readonly />";
    
    var removeButton = "<button type='button' class='btn btn-danger' onclick='removeRow(this.parentElement.parentElement)'><span class='fa fa-times'></span></button>";
    
    var newRow = "<tr><td>"+supplierCodeText+"</td><td>"+supplierNameText+"</td><td>"+addressText+"</td><td>"+contactNoText+"</td><td>"+removeButton+"</td></tr>";
    
    var rows = tbody.innerHTML;
    rows += newRow;
    
    tbody.innerHTML = rows;
    
    supplierCodeField.focus();
    
    document.getElementById("save_supplier_button").style.display = "block";
    
    document.getElementById("supplier_row_count").value = rowCount+1;
}

function addUserRow(){
    var firstNameField = document.getElementById("first_name");
    var lastNameField = document.getElementById("last_name");
    var usernameField = document.getElementById("username");
    var passwordField = document.getElementById("password");
    var confirmPasswordField = document.getElementById("conf_password");
    var userGroupField = document.getElementById("user_group");
    
    var errorAlert = document.getElementById("item_error_msg");
    
    if(firstNameField.value === ""){
        firstNameField.style.border = "1px solid #ed5565";
        firstNameField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "First Name is Required";
        
        return false;
    }else{
        firstNameField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    
    if(lastNameField.value === ""){
        lastNameField.style.border = "1px solid #ed5565";
        lastNameField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Last Name is Required";
        
        return false;
    }else{
        lastNameField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    
    if (usernameField.value === "") {
        usernameField.style.border = "1px solid #ed5565";
        usernameField.focus();

        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Username is Required";

        return false;
    } else {
        $.ajax({
            type: "POST",
            url: 'a_check_username_for_new_user.php',
            data: {username: usernameField.value},
            success: function (data) {
                var arr = JSON.parse(data);

                if(arr.Result === "Username Already Exist"){
                    usernameField.style.border = "1px solid #ed5565";
                    usernameField.focus();

                    errorAlert.style.display = "block";
                    errorAlert.children[1].innerHTML = "Username Already Exist";
                    
                    return false;
                }else{
                    usernameField.style.border = "1px solid #ccc";
        
                    errorAlert.style.display = "none";
                    errorAlert.children[1].innerHTML = "";
                }
            }
        });
    }

    if(passwordField.value === ""){
        passwordField.style.border = "1px solid #ed5565";
        passwordField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Password is Required";

        return false;
    }else{
        passwordField.style.border = "1px solid #ccc";
 
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    
    if(passwordField.value !== confirmPasswordField.value){
        passwordField.style.border = "1px solid #ed5565";
        passwordField.focus();
        
        confirmPasswordField.style.border = "1px solid #ed5565";
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Entered Password Didn't match";
        
        return false;
    }else{
        passwordField.style.border = "1px solid #ccc";
        confirmPasswordField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    
    if(userGroupField.value === ""){
        userGroupField.style.border = "1px solid #ed5565";
        userGroupField.focus();
        
        errorAlert.style.display = "block";
        errorAlert.children[1].innerHTML = "Last Name is Required";
        
        return false;
    }else{
        userGroupField.style.border = "1px solid #ccc";
        
        errorAlert.style.display = "none";
        errorAlert.children[1].innerHTML = "";
    }
    
    var tBody = document.getElementById("user_tbody");
    var rowCount = tBody.rows.length;
    
    var firstNameText = "<input type='text' name='First_Name"+rowCount+"' class='hdnfield' value='"+firstNameField.value+"' readonly/>";
    var lastNameText = "<input type='text' name='Last_Name"+rowCount+"' class='hdnfield' value='"+lastNameField.value+"' readonly/>";
    var usernameText = "<input type='text' name='Username"+rowCount+"' class='hdnfield' value='"+usernameField.value+"' readonly/>";
    var passwordText = "<input type='password' name='Password"+rowCount+"' class='hdnfield' value='"+passwordField.value+"' readonly/>";
    var userGroupNameText = "<input type='text' name='User_Group_Name"+rowCount+"' class='hdnfield' value='"+userGroupField.options[userGroupField.selectedIndex].text+"' readonly/>";
    var userGroupIdText = "<input type='hidden' name='User_Group"+rowCount+"' class='hdnfield' value='"+userGroupField.value+"' readonly/>";
    
    var row = "<tr><td>"+firstNameText+"</td><td>"+lastNameText+"</td><td>"+usernameText+"</td><td colspan='2'>"+passwordText+"</td><td>"+userGroupNameText+userGroupIdText+"</td></tr>";
    
    var rows = tBody.innerHTML;
    rows += row;
    
    tBody.innerHTML = rows;
    
    firstNameField.focus();
    
    document.getElementById("user_row_count").value = rowCount;
    
    document.getElementById("save_user_button").style.display = "block";
}

function getPrivilageDetails(){
    var userGroupField = document.getElementById("user_group");
    var moduleField = document.getElementById("module");

    if(userGroupField.value !== "" && moduleField.value !== ""){
        $.ajax({
            type: "POST",
            url: 'a_get_group_privilage_details.php',
            data: {module_id: moduleField.value, group_id:userGroupField.value},
            success: function (data) {
                var subModuleUL = document.getElementById("check_box_ul");
                
                subModuleUL.innerHTML = data;
            }
        });
    }
}