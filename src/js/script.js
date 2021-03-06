/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };

  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };

	class Product{
		constructor(id, data){
			const thisProduct = this;
			thisProduct.id = id;
			thisProduct.data = data;
			thisProduct.renderInMenu();
			thisProduct.getElements();
			thisProduct.initAccordion();
			console.log('newProduct', thisProduct);
		}
		renderInMenu(){
			const thisProduct = this;

			const generatedHTML = templates.menuProduct(thisProduct.data);
			thisProduct.element = utils.createDOMFromHTML(generatedHTML);
			const menuContainer = document.querySelector(select.containerOf.menu);
			menuContainer.appendChild(thisProduct.element);
		}
		getElements(){
      const thisProduct = this;

  		thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
  		thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);
  		thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs);
  		thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);
  		thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);
		}
		initAccordion(){
			const thisProduct = this;

			/* znajdż element reagujący na kliknięcie */
			//const clickableTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);

			thisProduct.accordionTrigger.addEventListener('click', function(){
        event.preventDefault();
      /*toggle-dodanie klasy jeśli jej nie było */
        thisProduct.element.classList.toggle('active');

        const activeProducts = document.querySelectorAll('.product.active');
				console.log('activeProducts', activeProducts);

				for (let activeProduct of activeProducts) {
			    if (activeProduct !== thisProduct.element) {
			      activeProduct.classList.remove('active');
				  }
			  }
	    });
		}
	}

  const app = {
		initMenu: function(){
			const thisApp = this;
			console.log('thisApp.data', thisApp.data);

			for(let productData in thisApp.data.products){
				new Product(productData, thisApp.data.products[productData]);
			}
    },

		initData: function(){
			const thisApp = this;

			thisApp.data = dataSource;
		},

    init: function(){
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);

      thisApp.initData();
			thisApp.initMenu();
    },
  };

  app.init();
}
