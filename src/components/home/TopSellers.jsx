import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);

  async function fetchSellers() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setSellers(data);
  }

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-in" data-aos-offset="50" data-aos-once="true">
                Top Sellers
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div
            className="col-md-12"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-offset="50"
            data-aos-once="true"
          >
            <ol className="author_list">
              {sellers.length
                ? sellers.map((seller, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to={`/author/${seller.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={seller.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${seller.authorId}`}>
                          {seller.authorName}
                        </Link>
                        <span>{seller.price} ETH</span>
                      </div>
                    </li>
                  ))
                : new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton
                          height={"50px"}
                          width={"50px"}
                          borderRadius={"50%"}
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="author_list_info">
                        <Skeleton
                          width={"125px"}
                          height={"20px"}
                          borderRadius={"8px"}
                        />
                        <span>
                          <Skeleton
                            width={"70px"}
                            height={"20px"}
                            borderRadius={"8px"}
                          />
                        </span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
