let productDetails = [
    {
      name: "FIFA 2021",
      price: 24.5,
      imageUrl:
        "https://static-ie.gamestop.ie/images/products/276411/3max.jpg",   
      qty: 10,
      rate: 5.5
      
    },
    {
      name: "Snake, The Beginnings",
      price: 12.2,
      imageUrl: "https://i.pinimg.com/564x/2a/97/59/2a9759e8cf97da57ccbb06ef09128df7.jpg",
      qty: 15,
      rate: 4.5
    },
    {
      name: "Dark souls III",
      price: 1.20,
      imageUrl: "https://www.jrc.cz/api/File/78993/download?format=jpg",
      qty: 20,
      rate: 2.3
    },
    {
      name: "Wrld of Tanks VIII",
      price: 0.5,
      imageUrl:
        "https://store-images.s-microsoft.com/image/apps.31552.67082279703731056.ae674156-cfa6-4b84-8bc3-75a36fe31c81.cd4ce189-afd4-40b9-b9b1-e48fe4a739ea?w=400&h=600",
      qty: 35,
      rate: 1.1
        
    },
    {
      name: "Need for Speed",
      price: 20.2,
      imageUrl:
        "https://i.3djuegos.com/juegos/9966/need_for_speed_2013__nombre_provisional_/fotos/ficha/need_for_speed_2013__nombre_provisional_-2409211.jpg",
      qty: 25,
      rate: 2.2
        
    }
  ];

  let cart = [];
  
  //click events {
  function addItem(event) {
    let btnClicked =
      event.parentElement.parentElement.parentElement.parentElement.parentElement;
    let name = btnClicked.getElementsByClassName("product-name")[0].innerText;
    let price = parseFloat(
      btnClicked
        .getElementsByClassName("product-price")[0]
        .innerText.replace("$ ", "")
    );
    let imgSrc = btnClicked.getElementsByClassName("product-img")[0].src;
    SwitchBtns(btnClicked);
    let cartItem = {
      name,
      price,
      imgSrc,
      qty: 1
    };
    CartItems(cartItem);
    cart.push(cartItem);
    RenderCart();
    CartItemsTotal();
  }
  
  function removeItem(event) {
    let btnClicked = event.parentElement;
    let itemName = btnClicked.getElementsByClassName("name")[0].innerText;
    let productNames = document.getElementsByClassName("product-name");
    cart.forEach((item, i) => {
      if (itemName == item.name) {
        cart.splice(i, 1);
        for (let name of productNames) {
          if (itemName == name.innerText) {
            let found = name.parentElement.parentElement;
            SwitchBtns(found);
          }
        }
      }
    });
    RenderCart();
    CartIsEmpty();
    CartItemsTotal();
  }
  
  function clearCart() {
    ToggleBackBtns();
    cart.length = 0;
    RenderCart();
    CartIsEmpty();
    CartItemsTotal();
  }
  
  function qtyChange(event, h) {
    let btnClicked = event.parentElement.parentElement;
    let isPresent = btnClicked.classList.contains("btn-add");
    let itemName = isPresent
      ? btnClicked.parentElement.parentElement.getElementsByClassName(
          "product-name"
        )[0].innerText
      : btnClicked.parentElement.getElementsByClassName("name")[0].innerText;
    let productNames = document.getElementsByClassName("product-name");
    for (let name of productNames) {
      if (itemName == name.innerText) {
        let productBtn = name.parentElement.parentElement.getElementsByClassName(
          "qty-change"
        )[0];
        cart.forEach((item, i) => {
          if (itemName == item.name) {
            if (h == "add" && item.qty < 10) {
              item.qty += 1;
              btnClicked.innerHTML = QtyBtn(item.qty);
              productBtn.innerHTML = QtyBtn(item.qty);
            } else if (h == "sub") {
              item.qty -= 1;
              btnClicked.innerHTML = QtyBtn(item.qty);
              productBtn.innerHTML = QtyBtn(item.qty);
              if (item.qty < 1) {
                cart.splice(i, 1);
                productBtn.innerHTML = AddBtn();
                productBtn.classList.toggle("qty-change");
              }
            } else {
         
              document.getElementsByClassName("stock-limit")[0].style.display =
                "flex";
              sideNav(0);
            }
          }
        });
      }
    }
    RenderCart();
    CartIsEmpty();
    CartItemsTotal();
  }

  
 function sideNav(modal) {
    let sideNav = document.getElementsByClassName("side-nav")[0];
    let cover = document.getElementsByClassName("cover")[0];
    sideNav.style.right = modal ? "0" : "-100%";
    cover.style.display = modal ? "block" : "none";
    CartIsEmpty();
  }
  // button components -  Ux {
  function AddBtn() {
    return `
  <div>
    <button onclick='addItem(this)' class='add-btn'>Add to Cart <i class='fas fa-chevron-right'></i></button>
  </div>`;
  }
  
  function QtyBtn(qty = 1) {
    if (qty == 0) return AddBtn();
    return `
  <div>
    <button class='btn-qty' onclick="qtyChange(this,'sub')"><i class="fas fa-minus"></i></button>
    <p class='qty'>${qty}</p>
    <button class='btn-qty' onclick="qtyChange(this,'add')"><i class="fas fa-plus"></i></button>
  </div>`;
  }
  //}
  
  //Ui components {
  function Product(product = {}) {
    let { rate, name, price, imageUrl} = product;
    return `
  <div class='card'>
    <div class='top-bar'>
   
    <!--<i class='fab fa-apple'></i>-->
      <p>Rating: ${rate} </p> 
    </div>
    <div class='img-container'>
      <img class='product-img' src='${imageUrl}' alt='' />
      <div class='out-of-stock-cover'><span>Out Of Stock</span></div>
    </div>
    <div class='details'>
      <div class='name-fav'>
        <strong class='product-name'>${name}</strong>
        <button onclick='this.classList.toggle("fav")' class='heart'><i class='fas fa-heart'></i></button>
      </div>
      <div class='purchase'>
        <p class='product-price'>$ ${price}</p>
        <span class='btn-add'>${AddBtn()}</span>
      </div>
    </div>
  </div>`;
  }
  
  function CartItems(cartItem = {}) {
    let { name, price, imgSrc, qty} = cartItem;
    return `
  <div class='cart-item'>
    <div class='cart-img'>
      <img src='${imgSrc}' alt='' />
      
    </div>
    
    <strong class='name'>${name}</strong>
    
    <span class='qty-change'>${QtyBtn(qty)}</span>
    
    <p class='price'>$ ${price * qty}</p>
  
    <button onclick='removeItem(this)'><i class='fas fa-trash'></i></button>
  </div>`;
  }
  
  function BannerCircleEffect() {
    return `
  <div class='banner'>
    <ul class="box-area">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    </ul>
    <div class='main-cart'>${ShowProducts()}</div>
  
    <div class='nav'>
      <button onclick='sideNav(1)'><i class='fas fa-shopping-cart' style='font-size:2rem;'></i></button>
      <span class= 'total-qty'>0</span>
    </div>
    <div onclick='sideNav(0)' class='cover'></div>
   
    <div class='cart'>${CartSideNav()}</div>
    <div class='stock-limit'>
      <p>Stock Limit 10 Items</p>
     
    </div>
  <div  class='order-now'></div>
  </div>`;
  }
  
  function CartSideNav() {
    return `
  <div class='side-nav'>
    <button onclick='sideNav(0)'><i class='fas fa-times'></i></button>
    <h2>Cart</h2>
    <div class='cart-items'></div>
    <div class='final'>
      <strong>Total: $ <span class='total'>0</span>.00</strong>
      <div class='action'>
       
        <button onclick='clearCart()' class='btn clear'>Clear Cart <i class='fas fa-trash' style='color:#bb342f;'></i></button>
      </div>
    </div>
  </div>`;
  }

  //updates Ui components {
  function ShowProducts() {
    let products = productDetails.map((product) => {
      return Product(product);
    });
    return products.join("");
  }
  
  function DisplayCartItems() {
    let cartItems = cart.map((cartItem) => {
      return CartItems(cartItem);
    });
    return cartItems.join("");
  }
  
  function RenderCart() {
    document.getElementsByClassName(
      "cart-items"
    )[0].innerHTML = DisplayCartItems();
  }
  
  function SwitchBtns(found) {
    let element = found.getElementsByClassName("btn-add")[0];
    element.classList.toggle("qty-change");
    let hasClass = element.classList.contains("qty-change");
    found.getElementsByClassName("btn-add")[0].innerHTML = hasClass
      ? QtyBtn()
      : AddBtn();
  }
  
  function ToggleBackBtns() {
    let btns = document.getElementsByClassName("btn-add");
    for (let btn of btns) {
      if (btn.classList.contains("qty-change")) {
        btn.classList.toggle("qty-change");
      }
      btn.innerHTML = AddBtn();
    }
  }
  
  function CartIsEmpty() {
    let emptyCart = `<span class='empty-cart'>Empty Cart :( </span>`;
    if (cart.length == 0) {
      document.getElementsByClassName("cart-items")[0].innerHTML = emptyCart;
    }
  }
  
    function CartItemsTotal() {
    let totalPrice = cart.reduce((totalCost, item) => {
      return totalCost + item.price * item.qty;
    }, 0);
    let totalQty = cart.reduce((total, item) => {
      return total + item.qty;
    }, 0);
    document.getElementsByClassName("total")[0].innerText = totalPrice;
    document.getElementsByClassName("total-qty")[0].innerText = totalQty;
  }

  
function Products() {
    return `
  <div>
    ${BannerCircleEffect()}
  </div>`;
  }
  
  document.getElementById("products").innerHTML = Products();
  