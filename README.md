# Web-Development-RC
Web Development Project for WEDE5020
# Kwa Shumilensizwa Website
Student Information

Name: Phumlani Fikeni
Student Number: ST10526062
Module: WEDE5020 – Web Development (Introduction)
Year: 2026

# Project Overview

This project is a website for Kwa Shumilensizwa, a restaurant that specialises in traditional Kasi-inspired meals.

The aim is to give the restaurant its own online presence where customers can learn about the business, view the menu, make enquiries, find the restaurant and access online ordering.

# Website Goals and objectives
| **Goal** | **Objectives** |
|---|---|
| **Increase online visibility** | Create a dedicated website with clear headings and relevant information to improve search-engine visibility. Ensure customers can easily find accurate and up-to-date restaurant information. |
| **Increase customer orders** | Include clear calls-to-action such as **Order Now, View Menu and Contact Us**. Make the ordering process simple and connect the website to the existing ordering platform where appropriate. |
| **Showcase the menu** | Present menu items clearly with prices, descriptions and appealing food images. Organise the menu into categories so customers can quickly find what they are looking for. |
| **Strengthen the restaurant’s brand** | Use consistent colours, typography, imagery and branding throughout the website. Establish the website as an independent digital presence for the restaurant. |
| **Improve customer communication** | Make contact details, location, opening hours and social-media links easy to access. Include a contact/enquiry form so customers have a direct way to communicate with the restaurant. |

# Features and Functionality
### Homepage

The homepage will provide an immediate introduction to Kwa Shumilensizwa and
allow users to quickly access important information and website functions.

| Feature | Description |
|---|---|
| **Restaurant logo/name** | Displays the Kwa Shumilensizwa logo and restaurant name to establish the restaurant's brand identity. |
| **Welcome message** | Provides a short introduction and welcoming message to visitors. |
| **View Menu button** | Directs users to the menu page, where they can view available meals, descriptions and prices. |
| **Order Now button** | Allows users to access the ordering section and select meals they would like to purchase. |
| **Featured meals** | Displays selected or popular dishes with images, names, descriptions and prices. |
| **About Us section** | Provides a brief introduction to the restaurant, including its background, values and identity. |
| **Reviews** | Displays customer reviews and feedback about their experiences with the restaurant. |
| **Opening hours** | Shows the restaurant's operating days and hours so customers know when it is open. |
| **Location/contact information** | Provides the restaurant's address, phone number and other relevant contact details. |
| **Social-media links** | Provides links to the restaurant's social-media platforms for updates, promotions and additional content. |
| **View Our Menu / Order Now** | Provides clear call-to-action buttons that guide users towards browsing the menu or placing an order. |

# LAYOUT:
- Page	File	Purpose
- Home Home.html	Introduces the restaurant and highlights meals
- About Us	about.html	Explains the restaurant's background and values
- Menu	menu.html	Displays meals, categories and prices
- Enquiry	enquiry.html	Allows customers to make enquiries and order requests
- Contact	contact.html	Provides contact, location and opening information<br>
**Sitemap** <br>
Home <br />
│<br />
├── About Us <br />
├── Menu <br />
│   ├── Beef <br />
│   ├── Chicken <br />
│   ├── Pork <br />
│   ├── Fish <br />
│   ├── Traditional Meals <br />
│   ├── Sides <br />
│   └── Drinks <br />
├── Enquiry <br />
└── Contact <br />
Main Features
-The website will include:
-Responsive navigation.
-Food and restaurant images.
-Menu categories.
-Meal prices and descriptions.
-Order buttons.
-Enquiry form.
-Contact form.
-Restaurant location and map.
-Opening hours.
-Social-media links.
-Link to the online ordering platform.
-Responsive design for different screen sizes.
-Basic JavaScript functionality.
-Design

# Colours
- Orange/Red: Main buttons and highlights.
- Yellow: Secondary accents.
- Red: Headings and food categories.
- Deep Purple: Navigation and footer.
- Lime Green: Background sections.
- Typography
- Poppins: Headings.
- Open Sans: Body text.

#Technologies used
- HTML5 – Website structure.
- CSS3 – Styling and responsive layout.
- JavaScript – Interactivity and form validation.
- Google Maps – Location information.
- GitHub – Version control and project submission.<br>
**Project Structure**<br>
Web-Development-RC/ <br />
│ <br />
├── Home.html <br />
├── about.html <br />
├── menu.html <br />
├── enquiry.html <br />
├── contact.html <br />
├── robots.txt <br />
├── sitemap.xml <br />
├── _headers<br />
│ <br />
├── css/ <br />
│   └── style.css <br />
│ <br />
├── js/ <br />
│   ├── script.js <br />
│   ├── gallery-data.js  <br />
│   └── main.js <br />
│ <br />
├── images/ <br />
│   └── beef-meal.jpg, chicken-meal.jpg, pork-chop-meal.jpg, grilled-tilapia-meal.jpg, <br />
│       mogodu-tripe-meal.jpg, traditional-sides.jpg, cold-drinks.jpg, <br />
│       restaurant-takeaway.jpg, background-hero.jpg, and screenshots <br />
│  <br />
└── README.md

# Timeline
**The project is being developed in stages:** <br>
- Research and planning.<br>
- Website and design planning.<br>
- HTML structure.<br>
- CSS styling and responsive design.<br>
- JavaScript functionality.<br>
- Testing and improvements.<br>
- Final submission.<br>

## Part 1 Details
Part 1 focused mainly on research, planning and the initial development of the website.
Completed Part 1 activities included:
Organisation research.
Target audience research.
Website goals and objectives.
Current online presence analysis.
Website feature planning.
Colour palette selection.
Typography planning.
Wireframes.
Sitemap.
Technical requirements.
Project timeline.
Budget.
Initial HTML structure.
Creation of the GitHub repository.
Navigation between website pages.
Initial restaurant and menu content.
Enquiry and contact forms.
## Part 2 – CSS Styling and Responsive Design
Part 2 timeframe: 15 August 2026 – 18 September 2026
- Part 2 focused on transforming the initial HTML structure into a styled and responsive website using an external CSS stylesheet.

**The main objectives of Part 2 were to:**
- Create and link an external CSS stylesheet.
- Establish consistent base styling.
- Apply typography styles.
- Create a clear page layout.
- Apply colours and visual styling.
- Add interactive hover and focus states.
- Create responsive layouts.
- Implement responsive navigation.
- Use relative units and scalable values.
- Make images responsive.
- Improve the overall visual consistency of the website.
# Responsive Testting
Desktop view/ 
![Website Screenshot](images/Screenshot%202026-09-18%20173326.png)
Smaller sized
![Website Screenshot](images/Screenshot%202026-09-18%20173859.png)

## Part 3 – Enhancing Functionality and SEO
Live website: https://famous-pothos-ebc837.netlify.app/ (deployed on Netlify)

Part 3 added JavaScript interaction, search engine optimisation and working forms to the styled website from Part 2.

**Interactive elements.** The Home page Gallery is an accordion. It starts hidden and a DISPLAY GALLERY button reveals it (and changes to HIDE GALLERY). The gallery cards are not written in the HTML: they are built with JavaScript from the data in js/gallery-data.js the first time the gallery is opened, which is a form of dynamic content loading and keeps the first page load light. Every food image on the Home, Menu and About pages opens in a lightbox when clicked or when Enter is pressed. The Contact page has an interactive Leaflet map with OpenStreetMap tiles and a marker popup. Panels, cards and buttons use CSS transitions and animations, which are switched off for visitors who prefer reduced motion.

**Search and sort.** The Menu page lets visitors search the menu as they type and sort it alphabetically or by price, with a message when nothing matches.

**Forms.** Both forms use HTML5 attributes (required, type, minlength, maxlength, pattern, min and max) together with JavaScript validation that shows a message under each invalid field. Phone numbers must be valid South African numbers, dates cannot be in the past or on a Sunday, and times must fall within opening hours (08:45 to 20:00). The enquiry form sends its data with AJAX (fetch) to a Google Apps Script and then shows an instant response with an estimated cost (price multiplied by quantity) and availability. The contact form compiles the validated details into an email addressed to info@kwashumilensizwa.co.za, shows a preview, and the visitor sends it with the Send Email button. Both forms have a hidden spam-trap field.

**SEO.** Every page has a unique title tag and meta description, a canonical link and Open Graph tags. Headings are structured with one H1 per page. Images have descriptive file names (for example beef-meal.jpg) and alt text. The Home page has Restaurant structured data (JSON-LD) with the address and opening hours for local search. robots.txt and sitemap.xml are included and the sitemap is listed in robots.txt. Target keywords used in the content include: Kasi food Durban, traditional South African food Durban, mogodu, takeaway Durban, and Clark Road restaurant.

**Page speed.** Images were resized and compressed (about 5.4 MB reduced to about 1.4 MB for the images used by the site), below-the-fold images load lazily, the main hero image loads immediately, and scripts use defer.

**Security.** The _headers file sets a Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy and Permissions-Policy on Netlify. External links use rel="noopener noreferrer", user input is only ever written to the page as text (never as HTML), the Leaflet files are pinned to one version with integrity hashes, and the site is served over HTTPS.

**Off-page SEO (planned).** Link the website from the restaurant's Facebook and Instagram pages and its Uber Eats listing, and claim a Google Business Profile for 130 Clark Road.

### Responsive testing (Part 3)
Screenshots of the website on desktop, tablet and mobile devices are to be added here.

# Changelog
**Part 1 30 July 2026 – 14 August 2026**
Organisation research.<br>
Target audience.<br>
Website goals.<br>
Current online presence analysis.<br>
Website features.<br>
Colour palette.<br>
Typography.<br>
Wireframes.<br>
Sitemap.<br>
Technical requirements.<br>
Project timeline.<br>
Budget.<br>
Initial HTML structure.<br>
Created the GitHub repository.<br>
Completed the initial research and planning.<br>
Created the website sitemap.<br>
Planned the five main website pages.<br>
Created the initial HTML structure.<br>
Added navigation between pages.<br>
Added initial menu and restaurant content.<br>
Added enquiry and contact forms.<br>
Planned Updates<br>
**Part 2 - 15 August 2026 - 18 September 2026**<br>
4 September 2026<br>
- Added detailed objectives for the website goals to README.md.
- Added the Features and Functionality section to README.md.
- Updated the sitemap/project structure to include missing directories and files.

<br> 16 September 2026<br>
- Removed an unnecessary CSS file.
- Created and implemented the main external style.css stylesheet.
- Linked the external stylesheet to the website pages.
- Edited and improved the stylesheet.
- Added consistent styling across the website.
- Added responsive layouts using CSS Grid and Flexbox.
- Added responsive navigation.
<br> 17 September 2026 <br>
- Updated the changelog.
- Added references to README.md.
- Added the CSS reset stylesheet.
- Included the source/reference for the reset code.
- Updated typography and font styling.
- Added responsive/scalable font sizing.
- Added missing images.
- Improved image styling and responsiveness.
- Added hover and focus styling.
- Added background-image styling.
<br>18 September 2026 <br>
- Completed Part 2 CSS styling and responsive design updates.
- Continued refining the external stylesheet.
- Applied responsive styling to navigation, content sections, cards, forms and images.
- Reviewed the website layout for desktop and smaller screen sizes.
- Updated README.md to document the Part 2 development work.
- Updated references used during the CSS and website development process.
**Part 3 - 18 September 2026 - 5 November 2026**<br>
<br>Edits based on Part 2 feedback<br>
- No major changes where needed: Feedback was to relate git commits to  changelog

<br>29 October 2026<br>
- Moved the DISPLAY button out of the Menu page and into the Home page Gallery. The gallery now starts hidden (hidden attribute in the HTML) and the button reveals and hides it. The old version showed the menu first because the script set aria-expanded to true, and its search code overrode the hidden state.
- Rewrote the accordion function so it works for any button with the accordion-toggle class and keeps the button's label and +/- icon when toggled.
- Built the gallery cards dynamically with JavaScript from js/gallery-data.js, created the first time the gallery is opened.
- Rebuilt the lightbox with event delegation so it also works for images added by JavaScript, added keyboard support and an image caption.
- Menu page: removed the duplicate search and sort controls (two elements shared the same ids), and added a live message for when no meals match the search.
- Enquiry form: added JavaScript validation for name, email, phone, enquiry type, quantity, date and time (no past dates, no Sundays, opening hours only) and message length. Added a response that shows the estimated cost and availability. Added sides and cold drinks to the meal list.
- Enquiry form: fixed the status message, which was written to a different element than the one in the HTML, and kept the AJAX submission to the Google Apps Script.
- Contact form: added the missing Type of Message field, validation, and a compiled email preview with a Send Email (mailto) button addressed to the recipient set in script.js. Removed the FormSubmit service.
- Fixed invalid HTML on the Contact page (a mistyped closing row tag and an extra closing div).
- Added hidden spam-trap fields to both forms.
- SEO: added a unique title tag and meta description to every page (the Home page had no meta description), canonical links, Open Graph tags and Restaurant structured data.
- SEO: renamed images to descriptive lowercase names with hyphens. The old names (for example beef.jpg in the HTML against Beef.jpg on disk) would fail on Netlify, whose servers are case-sensitive.
- SEO: fixed sitemap.xml (missing namespace, spaces inside the addresses) and robots.txt (the Sitemap line now points to sitemap.xml).
- Page speed: resized and compressed images, loaded the hero image eagerly and other images lazily, and added defer to scripts.
- Security: added the _headers file, rel="noopener noreferrer" on external links, and fixed the typo in the About page footer.
- Removed unused helper code from main.js.
- Tested the gallery toggle, lightbox, menu search, both forms and the map in an automated test.
<br>30 October 2026<br>



# References
Awada, R., 2024. Easy Homemade Beef Stew. [Online]  
Available at: https://healthyfitnessmeals.com/homemade-beef-stew/ 
[Accessed 13 August 2026]. <br>
Ayutthaya, T (2020) Coca-Cola Classic in a glass bottle and can on dark toned cement Background. Coca Cola, Coke is th. Coca-Cola Classic in a glass bottle and can on dark toned cement Background. Coca Cola, Coke is the most popular carbonated soft drink beverages sold around the world [Photographs]. Dreamstime. Available at:
https://www.vecteezy.com/photo/15656435-ayutthaya-thailand-25june2020-coca-cola-classic-in-a-glass-bottle-and-can-on-dark-toned-cement-background-coca-cola-coke-is-the-most-popular-carbonated-soft-drink-beverages-sold-around-the-world
[Accessed 13 August 2026]. <br>
Colorary, n.d. 70 Restaurant Color Palettes & Schemes. [Online]  
Available at: https://colorany.com/color-palettes/restaurant-color-palettes/ 
[Accessed 13 August 2026]. <br>
Clark, R. (2009) HTML5 Reset Stylesheet. HTML5 Doctor, 27 July. Available at: https://html5doctor.com/html-5-reset-stylesheet/ [Accessed: 17 September 2026].<br>
contentsquare, n.d. KPI. [Online]  
Available at: https://contentsquare.com/guides/web-analytics/metrics/ 
[Accessed 13 August 2026] <br>
Google (2026) The Maps Embed API overview. Google for Developers. Available at: https://developers.google.com/maps/documentation/embed/get-started (Accessed: 18 September 2026).<br>
Grocito, 2026. Minimal vs Bold Branding: Which Works Better for Your Industry? (A 
Friendly, Practical Guide). [Online]  
Available at: https://blog.grocito.com/minimal-vs-bold-branding-which-works-better-for-your-industry-a-friendly-practical-guide/ 
[Accessed 13 August 2026]. <br>

Foodie (2024) Mogodu (Tripe) Recipe: A South African Culinary Tradition [Photograph]. foodiemag. Available at:
https://foodiemag.co.za/mogodu-tripe-recipe-a-south-african-culinary-tradition/
[Accessed: 18 September 2026]. <br>

In Your Pocket (n.d.) A South African Chisa Nyama [Photograph]. Available at:
https://www.inyourpocket.com/southafrica/johannesburg/articles/a-south-african-chisa-nyama
[Accessed: 18 September 2026]. <br>

Melati, B (2026) Chakalaka Charm: South African ligabandot Spicy Vegetable Relish [Photograph]. Available at:
https://www.fatcitystacks.com/ligabandot-chakalaka-charm/
[Accessed: 18 September 2026]. <br>

Penwills (2025) Grilled tilapia [Photograph]. Wikimedia Commons. Available at:
https://commons.wikimedia.org/wiki/File:Grilled_tilapia.jpg
[Accessed: 18 September 2026]. <br>

Pradhan, K. (2015) Pork Chops [Photograph]. Wikimedia Commons. Available at:
https://commons.wikimedia.org/wiki/File:Pork_Chops.jpg
(Accessed: 18 September 2026).

Wikimedia Commons (n.d.) Category: Takeaway food shops in South Africa [Photographs].
Available at:
https://commons.wikimedia.org/wiki/Category:Takeaway_food_shops_in_South_Africa
[Accessed: 18 September 2026]. <br>

Agafonkin, V. (2023) Leaflet: an open-source JavaScript library for interactive maps, version 1.9.4. Available at: https://leafletjs.com/ [Accessed: 29 October 2026]. <br>

Google (n.d.) SEO Starter Guide. Google Search Central. Available at: https://developers.google.com/search/docs/fundamentals/seo-starter-guide [Accessed: 29 October 2026]. <br>

OpenStreetMap contributors (n.d.) OpenStreetMap. Available at: https://www.openstreetmap.org/copyright [Accessed: 29 October 2026]. <br>

Sitemaps.org (n.d.) Sitemaps XML format. Available at: https://www.sitemaps.org/protocol.html [Accessed: 29 October 2026]. <br>

Schema.org (n.d.) Restaurant. Available at: https://schema.org/Restaurant [Accessed: 29 October 2026]. <br>

Google form ID
https://script.google.com/macros/s/AKfycbwhLIKQ6oenVYIFMUSXAV6BGABxuacYJQ8DMS5eEen9z1k8gb7kCe_bkf7_RoCGwml0/exec
