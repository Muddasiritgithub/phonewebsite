"use client";
import React, { useEffect, useState } from "react";
import HeaderAppBar from "../../../src/app/Components/Common/HeaderAppBar/index";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Grid,
  Container,
} from "@mui/material";
import Image from "next/image";
import banner_two from "../../../public/Images/banner_two.png";
import halfheadphone from "../../../public/Images/halfheadphone.png";
import halfmacbook from "../../../public/Images/halfmacbook.png";
import PlayStation from "../../../public/Images/PlayStation.png";
import halfairbuds from "../../../public/Images/halfairbuds.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"; // Left arrow
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"; // Right
import PhoneCard from "../../../src/app/Components/Common/PhoneCard/index";
import Phones from "../../../public/Images/Phones.png";
import Smart_watches from "../../../public/Images/Smart_watches.png";
import Gaming from "../../../public/Images/Gaming.png";
import Headphones from "../../../public/Images/Headphones.png";
import Computers from "../../../public/Images/Computers.png";
import Cameras from "../../../public/Images/Cameras.png";
import NewArrivalPhones from "../../../src/app/Components/Common/NewArrivalPhones/index";
import tablet from "../../../public/Images/tablet.png";
import airbuds from "../../../public/Images/airbuds.png";
import watch from "../../../public/Images/watch.png";
import headphone from "../../../public/Images/headphone.png";
import smartwatch from "../../../public/Images/smartwatch.png";
import dslrcamera from "../../../public/Images/dslrcamera.png";
import iphone14 from "../../../public/Images/iphone14.png";
import sumsung from "../../../public/Images/sumsung.png";
import PopularProducts from "../../../src/app/Components/Common/PopularProducts/index";
import proairbud from "../../../public/Images/proairbud.png";
import Macbook from "../../../public/Images/Macbook.png";
import infinix from "../../../public/Images/infinix.png";
import pad from "../../../public/Images/pad.png";
import banner_one from "../../../public/Images/banner_one.png";
import Footer from "../../../src/app/Components/Common/Footer/index";
import axios from "axios";
import Cart from "../../../src/app/Components/Common/Cart/index";
import { Drawer } from "@mui/material";



const page = () => {
  const [activeCategory, setActiveCategory] = useState("Phones");
  const [categoryDataFromApi, setCategoryDataFromApi] = useState({
    Phones: [],
    Tablets: [],
    Watches: [],
    PhoneAccessories: [],
  });
  const [cartItems, setCartItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const phoneCardsData = [
    { imageSrc: Phones, heading: "Phones" },
    { imageSrc: Smart_watches, heading: "Tablets" },
    { imageSrc: Gaming, heading: "Watches" },
    { imageSrc: Headphones, heading: "PhoneAccessories" },
  ];

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };


 
  //Add to cart

  const handleAddToCart = (product) => {
    const updatedCart = [...cartItems];
    const existingProduct = updatedCart.find(
      (item) => item.description === product.description
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCartItems(updatedCart);
    setDrawerOpen(true); // Open the drawer when an item is added
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  // const product = { name: "Sample Product" };

  //Add to cart End

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/getAllProducts`
        );
        console.log("response", response.data);
        console.log("Muddasir:", response.data.data);

        const newCategoryData = {
          Phones: [],
          Tablets: [],
          Watches: [],
          PhoneAccessories: [],
        };

        response.data.data.forEach((item) => {
          console.log("Loop Iteration",item);
          const { Category, image, Discription, Price,Name,Company } = item; // Destructuring specific keys from item

          // Create a formatted object for each item with specific keys
          const formattedItem = {
            imageSrc: image, // Assuming the API response contains 'image' key for the image URL
            description: Discription, // Assuming the API response contains 'description' key
            price: Price, // Assuming the API response contains 'price' key
            name: Name, // Assuming the API response contains 'price' key
            Company: Company, // Assuming the API response contains 'price' key


          };

          // Categorize items into Phones, Tablets, and Watches
          if (Category === "Phones") {
            newCategoryData.Phones.push(formattedItem);
          } else if (Category === "Tablets") {
            newCategoryData.Tablets.push(formattedItem);
          } else if (Category === "Watches") {
            newCategoryData.Watches.push(formattedItem);
          } else if (Category === "PhoneAccessories") {
            newCategoryData.PhoneAccessories.push(formattedItem);
          }
        });

        setCategoryDataFromApi(newCategoryData);
        console.log("type",newCategoryData)
        console.log("categoryDataFromApi", categoryDataFromApi);
        console.log("formattedItem", formattedItem);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/category/getAllCategories`
        );
        console.log("response", response.data);
        console.log("Category data:", response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    fetchCategoryData();
  }, []);
  return (
    <>
      <HeaderAppBar setDrawerOpen={setDrawerOpen}/>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: "380px", // Set your desired width here
          },
        }}
      >
        <Cart cartItems={cartItems} setCartItems={setCartItems} handleClose={handleClose}  />
      </Drawer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "400px",
          backgroundImage: `url('/Images/banner_two.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          position: "relative",
        }}
      >
        <Box sx={{ position: "absolute", top: "30%", left: "10%" }}>
          <Typography
            variant="body1"
            sx={{ color: "#909090", fontSize: "25px" }}
          >
            Pro.Beyond.
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            sx={{ marginBottom: "16px", fontSize: "96px" }}
          >
            iPhone 14 <span sx={{ fontFamily: "Inter-Bold" }}>Pro</span>
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginBottom: "16px", color: "#909090", fontSize: "18px" }}
          >
            Created to change everything for the better. For everyone
          </Typography>
          <Button variant="outlined" color="primary">
            Shop Now
          </Button>
        </Box>
      </Box>
      <Box sx={{}}>
        <Grid container spacing={2}>
          {/* Left Side Grid */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {/* Top Section - PlayStation */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Box sx={{ width: "50%" }}>
                    <Image src={PlayStation} alt="Playstation" />
                  </Box>
                  <Box sx={{ paddingLeft: 2 }}>
                    <Typography variant="h4" component="h2">
                      Playstation 5
                    </Typography>
                    <Typography variant="body1">
                      Incredibly powerful CPUs, GPUs, and an SSD with integrated
                      I/O will redefine your PlayStation experience.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Bottom Section - AirPods and Vision Pro */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row", // Horizontal layout
                        justifyContent: "flex-start", // Align content to the left
                        alignItems: "center", // Align items vertically in the center
                        backgroundColor: "#f0f0f0",
                        height: "100%",
                      }}
                    >
                      {/* Image Section */}
                      <Box
                        sx={{
                          width: "30%", // Set width of image container
                          marginRight: 2, // Add spacing between image and text
                        }}
                      >
                        <Image
                          src={halfheadphone}
                          alt="halfheadphone"
                          layout="responsive"
                          style={{ objectFit: "cover" }} // Ensure image fits container
                        />
                      </Box>

                      {/* Text Section */}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="h2">
                          Apple AirPods Max
                        </Typography>
                        <Typography variant="body1">
                          Computational audio. Listen, it's powerful.
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row", // Horizontal layout
                        justifyContent: "flex-start", // Align content to the left
                        alignItems: "center", // Align items vertically in the center
                        backgroundColor: "#f0f0f0",
                        height: "100%",
                      }}
                    >
                      {/* Image Section */}
                      <Box
                        sx={{
                          width: "60%", // Set width of image container
                          marginRight: 2, // Add spacing between image and text
                        }}
                      >
                        <Image
                          src={halfairbuds}
                          alt="halfairbuds"
                          layout="responsive"
                          style={{ objectFit: "cover" }} // Ensure image fits container
                        />
                      </Box>

                      {/* Text Section */}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" component="h2">
                          Apple Vision Pro
                        </Typography>
                        <Typography variant="body1">
                          An immersive way to experience entertainment
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* Right Side Grid */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row", // Horizontal layout (text on the left, image on the right)
                justifyContent: "space-between", // Ensure space between text and image
                alignItems: "center", // Vertically center the content
                backgroundColor: "#ebebeb",
                height: "100%",
              }}
            >
              {/* Text Section */}
              <Box sx={{ flexGrow: 1, paddingLeft: "12px" }}>
                <Typography variant="h3" component="h2">
                  Macbook Air
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  The new 15-inch MacBook Air makes room for more of what you
                  love with a spacious Liquid Retina display.
                </Typography>
                <Button variant="outlined">Shop Now</Button>
              </Box>

              {/* Image Section */}
              <Box
                sx={{
                  width: "40%", // Adjust width of the image container
                  display: "flex",
                  justifyContent: "flex-end", // Align image to the right
                }}
              >
                <Image
                  src={halfmacbook} // Replace with your actual image source
                  alt="Macbook Air"
                  layout="responsive"
                  style={{ objectFit: "contain" }} // Ensure the image fits nicely
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Container
        maxWidth={false}
        sx={{ padding: "0px", backgroundColor: "#FAFAFA" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            padding: "30px 00px",
          }}
        >
          <Typography variant="h5">Browse By Category</Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton aria-label="previous">
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton aria-label="next">
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Phone Cards Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            overflowX: "auto",
            paddingBottom: "40px",
          }}
        >
          {phoneCardsData.map((phone, index) => (
            <PhoneCard
              key={index}
              imageSrc={phone.imageSrc}
              heading={phone.heading}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </Box>
      </Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          pl: 2,
          mb: 2,
          mt: 4,
          gap: "10px",
        }}
        s
      >
        {["Phones", "Tablets", "Watches", "PhoneAccessories"].map(
          (category) => (
            <a
              key={category}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(category);
              }}
              style={{
                display: "block",
                marginBottom: "1rem",
                color: activeCategory === category ? "black" : "#EDEDED",
                textDecoration:
                  activeCategory === category ? "underline" : "none",
                fontWeight: activeCategory === category ? "bold" : "normal",
                cursor: "pointer",
              }}
            >
              {category}
            </a>
          )
        )}
      </Box>
      {chunkArray(categoryDataFromApi[activeCategory], 4).map(
        (chunk, chunkIndex) => (
          <Box
            key={chunkIndex}
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "30px", // Space between items
              mb: 4,
            }}
          >
            {chunk.map((product, index) => (
              <NewArrivalPhones
                key={index}
                imageSrc={product.imageSrc}
                description={product.description}
                title={product.name}
                price={product.price}
                Company={product.company}
                product={product}
                handleaddtocart={handleAddToCart}
               />
            ))}
          </Box>
        )
      )}{" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 6,
        }}
      >
        {/* Dynamically rendering fetched products */}
        {categoryDataFromApi.Watches.slice(0, 4).map((product, index) => (
          <PopularProducts
            key={product.id} // Use a unique identifier if available
            imageSrc={product.imageSrc}
            heading={product.description}
            title={product.name}
            paragraph={`Price: ${product.price}`}
            color={index % 2 === 0 ? "#EAEAEA" : "#F9F9F9"} // Alternating colors
          />
        ))}
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "400px", // You can adjust the height as needed
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <Image
          src={banner_one} // Update with the correct path to your image
          alt="Banner One"
          layout="fill"
          objectFit="cover"
          quality={100} // To improve the image quality
          priority // Optimize image loading
        />

        {/* Overlay content */}
        <Box
          sx={{
            position: "absolute",
            textAlign: "center",
            color: "#fff", // Text color to contrast with the background image
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Big Summer Sale
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 3,
              maxWidth: "600px",
            }}
          >
            Commodo fames vitae vitae leo mauris in. Eu consequat.
          </Typography>

          <Button
            variant="outlined"
            color="primary"
            sx={{
              padding: "10px 20px",
              textTransform: "none", // Keeps button text as written
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Box>
      <Box>
        <Footer />
      </Box>
    </>
  );
};

export default page;
