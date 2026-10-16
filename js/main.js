// 1. Модальное окно заявки
const orderDialog = document.getElementById('order-dialog');
const orderButtons = document.querySelectorAll('.product-card__button');
const closeDialogButton = document.getElementById('close-order-dialog');
const selectedProductInput = document.getElementById('selected-product');

if (orderDialog && orderButtons.length && closeDialogButton) {
    orderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const productName = button.dataset.product || '';
            if (selectedProductInput) {
                selectedProductInput.value = productName;
            }
            orderDialog.showModal();
        });
    });

    closeDialogButton.addEventListener('click', () => {
        orderDialog.close();
    });
}

// 2.Обработка отправки формы заявки
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');

if (orderForm && successMessage) {
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formElements = Array.from(orderForm.elements);

// Сброс предыдущих признаков ошибок
        formElements.forEach((element) => {
            if (element.willValidate) {
                element.removeAttribute('aria-invalid');
            }
        });

// Проверка встроенных HTML-ограничений
        if (!orderForm.checkValidity()) {
            formElements.forEach((element) => {
                if (element.willValidate && !element.checkValidity()) {
                    element.setAttribute('aria-invalid', 'true');
                }
            });
            orderForm.reportValidity();
            return;
        }

        successMessage.hidden = false;
        orderForm.reset();
        if (orderDialog) {
            orderDialog.close();
        }
    });
}