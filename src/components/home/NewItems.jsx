import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import Counter from "../UI/Counter";

const NewItems = () => {
  const [items, setItems] = useState([]);

  async function fetchItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setItems(data);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const options = {
    items: 4,
    margin: 10,
    nav: true,
    loop: true,
    dots: false,
    responsiveRefreshRate: 50,
    responsive: {
      1200: { items: 4 },
      768: { items: 3 },
      470: { items: 2 },
      0: { items: 1 },
    },
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {items.length ? (
            <OwlCarousel
              className="owl-theme"
              loop
              margin={10}
              nav
              {...options}
            >
              {items.map((item, index) => (
                <div className="nft__item" key={index}>
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${item.authorId}`}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title={item.title}
                    >
                      <img className="lazy" src={item.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  {item.expiryDate !== null && <Counter item={item} />}
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          ) : (
            <>
              <OwlCarousel
                className="owl-theme"
                loop
                margin={10}
                nav
                {...options}
              >
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Skeleton
                      width={"50px"}
                      height={"50px"}
                      borderRadius={"50%"}
                    />
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft__item_wrap">
                    <Skeleton
                      width={"100%"}
                      height={"225px"}
                      borderRadius={"8px"}
                    />
                  </div>
                  <div className="nft__item_info">
                    <Skeleton width={"100px"} height={"20px"} />
                    <div className="nft__item_price">
                      <Skeleton width={"50px"} height={"20px"} />
                    </div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>
                        <Skeleton width={"15px"} height={"15px"} />
                      </span>
                    </div>
                  </div>
                </div>
              </OwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
