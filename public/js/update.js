$(document).ready(function() {



function getCategories() {
        $.get('/api/category/', function(data) {
            console.log(data);
            let select = $('#category');
            let option = $(`<option value="">`);
            select.append(option);
            data.forEach((result, index) => {
                select.append($('<option>', {
                    value: result.id,
                    text: result.type
                }));
            })
        })
    }

    getCategories();

});