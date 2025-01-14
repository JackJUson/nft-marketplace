import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [nftItem, setNftItem] = useState({});

  async function fetchItem() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setNftItem(data);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItem();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {nftItem ? (
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={nftItem.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>
                      {nftItem.title} #{nftItem.tag}
                    </h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {nftItem.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {nftItem.likes}
                      </div>
                    </div>
                    <p>{nftItem.description}</p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nftItem.ownerId}`}>
                              <img
                                className="lazy"
                                src={nftItem.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nftItem.ownerId}`}>
                              {nftItem.ownerName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${nftItem.creatorId}`}>
                              <img
                                className="lazy"
                                src={nftItem.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${nftItem.creatorId}`}>
                              {nftItem.creatorName}
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{nftItem.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <Skeleton height={"100%"} width={"100%"} borderRadius={"8px"}/>
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton height={"40px"} width={"350px"} borderRadius={"4px"}/>

                      <div className="item_info_counts">
                        <Skeleton height={"30px"} width={"80px"}/>
                        <Skeleton height={"30px"} width={"80px"}/>
                      </div>
                      <p>
                      <Skeleton height={"200px"} width={"400px"} borderRadius={"8px"}/>
                      </p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <Skeleton height={"15px"} width={"80px"} borderRadius={"4px"}/>
                          <div className="item_author">
                            <div className="author_list_pp">
                                <Skeleton height={"50px"} width={"50px"} borderRadius={"50%"}/>
                                <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton height={"20px"} width={"150px"} borderRadius={"4px"}/>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                        <Skeleton height={"15px"} width={"80px"} borderRadius={"4px"}/>
                          <div className="item_author">
                            <div className="author_list_pp">
                                <Skeleton height={"50px"} width={"50px"} borderRadius={"50%"}/>
                                <i className="fa fa-check"></i>
                            </div>
                            <div className="author_list_info">
                              <Skeleton height={"20px"} width={"150px"} borderRadius={"4px"}/>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <Skeleton height={"15px"} width={"80px"}/>
                        <div className="nft-item-price">
                          <Skeleton height={"40px"} width={"80px"} borderRadius={"4px"}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        )}
      </div>
    </div>
  );
};

export default ItemDetails;
