let counter = 0;

const crossItem = element => {
    if (element.is(":checked"))
        return element.closest(".item").addClass("done");
    return element.closest(".item").removeClass("done");
};



$(document).ready(function () {
    
    const input = $("#input");
    const addButton = $("#add");
    const resetButton = $("#clear");
    const itemList = $("#item_list");

    const addItem = () => {
        let inputItem = input.val().trim();
        if (inputItem === '')
            return
        let newItem = createItem(inputItem);
        itemList.append(newItem);
        input.val('');
    };
    const clearList = () => itemList.empty();

    input.on("keyup", (event) => {
        if (event.keyCode === 13)
            addItem();
    })
    addButton.on("click", addItem);
    resetButton.on("click", clearList);

    $("#item_list").on("click", ".fa-square-check", function() {
        let checkBox = $(this).closest(".item").find("input");
        checkBox.prop("checked", !checkBox.is(":checked"));
        crossItem(checkBox);
    });

    $("#item_list").on("change", "input[type='checkbox']", function() {
        crossItem($(this));
    });
    
    $("#item_list").on("click", ".fa-trash-can", function() {
        $(this).closest(".item").remove();
    });

});

const createItem = text => {
    let item = $("<div></div>");
    item.attr("class", "item");

    let checkbox = $("<input>");
    checkbox.attr("type", "checkbox");
    checkbox.attr("id", counter);
    item.append(checkbox);

    let customCheckbox = $("<i></i>");
    customCheckbox.attr("class", "fa-solid fa-square-check");
    item.append(customCheckbox);
    
    let content = $("<label></label>");
    content.text(text);
    content.attr("for", counter++);
    item.append(content);

    let deleteButton = $("<i></i>");
    deleteButton.attr("class", "fa-solid fa-trash-can");
    item.append(deleteButton);
    
    return item;
};