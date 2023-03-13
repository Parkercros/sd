This website is designed to provide an online shopping experience for customers who are interested in purchasing meat and other related products. The code behind the site includes various functions that interact with a server to fetch and display data about different products.

Upon loading the page, the renderPage() function is called, which generates the layout and structure of the site. This includes creating a top banner, logo, and navigation bar with options to view meat, cheese, merchandise, a charcuterie board generator, and favorites. These options are clickable and call various functions to display relevant content on the page.

One of the main functions of the site is to fetch and display meat products. This is done through a call to a server that responds with a list of meat items, which are then displayed using the renderCard() function. The function creates a card for each meat item, which shows an image of the meat on the front and additional details about the item on the back. Users can click on a card to flip it and view more information, including the price per pound and an option to add the item to their cart.

The site also has a feature to display cheese products in a similar way. When the user clicks on the cheese option in the navigation bar, a call is made to the server to retrieve a list of cheese items. These items are then displayed on the page using the same renderCard() function used for the meat items.

In addition to displaying individual items, the site also includes a feature to generate a charcuterie board with a selection of meats and cheeses. This is done by randomly selecting three meat and cheese items from their respective lists and displaying them on the page.

Another important feature of the site is the ability to view and add items to a cart. The cartListMaker() function generates a list of items that have been added to the cart, along with their respective quantities and total price. Users can also adjust the quantity of an item in the cart, which updates the total cost. The cart can be accessed by clicking on the cart icon in the navigation bar.

Overall, this website provides a user-friendly interface for customers to view and purchase meat and related products. The JavaScript code provides dynamic functionality and interactivity, making the shopping experience smooth and enjoyable.


https://parkercros.github.io/
