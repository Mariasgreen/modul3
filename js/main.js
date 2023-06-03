const modalBtn = $('.present__btn');
const modalClose = $('.modal-order__close');


modalBtn.click(function(){
    $('.modal-order').show()
})

modalClose.click(function(){
    $('.modal-order').hide()
})

const modalOrderInput = $('.modal-order__input');
const modalOrderTitle = $('.modal-order__title');

modalOrderInput.focus(function(){
    modalOrderTitle
    .text(`введите ${$(this).attr('placeholder').toLowerCase()}`)
})

modalOrderInput.blur(function(){
    modalOrderTitle
    .text('заполните форму')
})


const modalOrderWrapper = $('.modal-order__wrapper');

$('.modal-order__form').submit(function(event){
event.preventDefault();
$.ajax({
url: 'https://jsonplaceholder.typicode.com/todos',
type: 'POST',
data: $(this).serialize(),
success(data){
    modalOrderTitle.text('спасибо ваша заявка принята , номер заявки' + data.id)
    $('.modal-order__form').slideUp(300);
    },
    error() {
        modalOrderTitle.text('что то пошло не так ,попробуйте позже')
    }
})
})


$('.header__burger').on('click', function(){
    $('.navigation').animate({
        left: 0
    }, 500, function(){
        $('.navigation__close').animate({
            opacity: 1
        }, 300, 'swing')
    }

    )
}
)




$('.navigation__close').on('click', function(){
    $('.navigation').animate({
        left: '-100vw'
    }, 500, function(){
        $('.navigation__close').animate({
            opacity: 0
        }, 300, 'swing')
    } )
})


$(document).on('click', function(e){
    if (!$(e.target).closest('.header__burger, .navigation').length) {
        $('.navigation').animate({
            left: '-100vw'
        }, 500, function(){
            $('.navigation__close').animate({
                opacity: 0
            }, 300, 'swing')
        } )
    }
});