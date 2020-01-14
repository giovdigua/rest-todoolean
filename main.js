$(document).ready( function () {
    //Generic initial variant and const
    let listHtml = $('#data-list').html();
    let listCompiled = Handlebars.compile(listHtml);
    const APIBASE = 'http://157.230.17.132:3007/todos/';
    let container = $('#dateList');


    getList();
    //This function print the list item after an ajax get query CRUD == READ
    function getList() {
        $.ajax({
            url:APIBASE,
            method:'GET',
            success:function (response) {
                for (var i = 0; i < response.length; i++) {
                    let itemText = response[i].text;
                    let idItem = response[i].id;
                    console.log(idItem + " " + itemText);
                    let listItemPlaceholder = {
                        idList:idItem,
                        singleItemText:itemText
                    }
                    let actualItem = listCompiled(listItemPlaceholder);
                    container.append(actualItem);
                }
            },
            error:function(err) {
                    console.log(err);
                }
        });
    }

    //This function create a list item CRUD = CREATE
    function createListItem(textListItem) {
        $.ajax({
            url:APIBASE,
            method:'POST',
            data:{
                text:textListItem
            },
            success:function () {
            container.empty();
            getList()
            },
            error:function(err) {
                    console.log(err);
                }
        });
    }
    //This function delete a list item CRUD = DELETE
    function deleteListItem(idListItem) {
        $.ajax({
            url:APIBASE + idListItem,
            method:'DELETE',
            success:function () {
            container.empty();
            getList()
            },
            error:function(err) {
                    console.log(err);
                }
        });
    }

    //This function intercepts the input and saves a new item in the list
    $('#saveItemBtn').click(function () {
        const inputText = $('#inputText').val().trim();
        if (inputText) {
            createListItem(inputText)
        }else{
            alert('Insert no empty text for your item!');
        }
    });

    //This function intercepts the click on the delete button of the item and updates the list
    $('#dateList').on('click','.fa-trash-alt',function () {
        const selectItemsID  =  $(this).parent('li').attr('dataId');
        deleteListItem(selectItemsID);
    });
    //This function intercepts the click on the edit button and edit the select item and after updates the list
    $('#dateList').on('click','.fa-edit',function () {
        $(this).siblings('.fa-save').addClass('active');
        $(this).addClass('hidden');
        $(this).siblings('.edit-input').addClass('active');
        $(this).siblings('.todo-text').addClass('hidden');
    });

    $('#dateList').on('click','.fa-save',function () {
        let text = $(this).siblings('.edit-input').val().trim();
        console.log(text);
        $(this).siblings('.fa-save').addClass('active');
        $(this).addClass('hidden');
        $(this).siblings('.edit-input').addClass('active');
        $(this).siblings('.todo-text').addClass('hidden');
    });
});
