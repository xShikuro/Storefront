import type { DeliveryMethod, PaymentMethod } from '../types/storefront'

export const checkoutConfig = {
  defaults: {
    deliveryMethod: 'courier' satisfies DeliveryMethod,
    paymentMethod: 'cashOnDelivery' satisfies PaymentMethod,
  },
  deliveryMethods: [
    {
      id: 'courier' satisfies DeliveryMethod,
      label: 'DELIVERY BY COURIER',
    },
  ],
  paymentMethods: [
    {
      id: 'cashOnDelivery' satisfies PaymentMethod,
      icon: '💵',
      label: 'ПРИ ПОЛУЧЕНИИ',
    },
  ],
  validation: {
    requireCartItems: true,
    requiredFields: {
      customerName: true,
      customerPhone: true,
      deliveryAddress: true,
    },
    rules: {
      address: {
        minLength: 8,
      },
      phone: {
        maxDigits: 15,
        minDigits: 7,
      },
    },
    messages: {
      addressTooShort: 'Введите полный адрес доставки',
      addressRequired: 'Введите адрес доставки',
      emptyCart: 'Добавьте товар в корзину',
      phoneInvalid: 'Введите корректный телефон',
      nameRequired: 'Введите имя',
      phoneRequired: 'Введите телефон',
      submitFailed: 'Не удалось оформить заказ',
    },
  },
  cart: {
    actions: {
      backToProducts: 'Вернуться к товарам',
      login: 'Войти',
      submit: 'ОФОРМИТЬ ЗАКАЗ',
      submitting: 'ОФОРМЛЯЕМ...',
    },
    emptyMessage: 'ВАША КОРЗИНА ПУСТА.',
    fields: {
      address: 'Адрес доставки',
      comment: 'Комментарий к заказу',
      name: 'Ваше имя *',
      phone: 'Телефон *',
    },
    itemForms: {
      few: 'товара',
      many: 'товаров',
      one: 'товар',
    },
    sections: {
      comment: 'КОММЕНТАРИЙ',
      contacts: 'КОНТАКТЫ',
      delivery: 'ДОСТАВКА',
      payment: 'ОПЛАТА',
      total: 'ИТОГО',
    },
    title: 'КОРЗИНА',
  },
  success: {
    confirmationText:
      'Мы свяжемся с вами по телефону {phone}, чтобы подтвердить доставку.',
    orderPrefix: 'ЗАКАЗ',
    summary: {
      customerName: 'Имя',
      customerPhone: 'Телефон',
      items: 'Товары',
      total: 'Итого',
    },
    title: 'ЗАКАЗ ОФОРМЛЕН',
  },
} as const
