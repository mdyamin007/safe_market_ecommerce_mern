/**
 *
 * Homepage
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Row, Col } from "reactstrap";

import actions from "../../actions";
import banners from "./banners.json";
import CarouselSlider from "../../components/Common/CarouselSlider";
import { responsiveOneItemCarousel } from "../../components/Common/CarouselSlider/utils";
import ProductFilter from "../../components/Store/ProductFilter";
import SelectOption from "../../components/Common/SelectOption";
import ProductsShop from "../ProductsShop";
import CategoryShop from "../CategoryShop";
import BrandsShop from "../BrandsShop";
import Page404 from "../../components/Common/Page404";
import { sortOptions } from "../../utils/store";
import { Switch, Route } from "react-router-dom";
import Pagination from "../../components/Common/Pagination";

class Homepage extends React.PureComponent {
  componentDidMount() {
    document.body.classList.add("home-page");
  }

  componentWillUnmount() {
    document.body.classList.remove("home-page");
  }

  render() {
    const { products, advancedFilters, filterProducts } = this.props;
    const { totalPages, currentPage, count, limit, order } = advancedFilters;
    const displayPagination = totalPages > 1;
    const totalProducts = products.length;
    const left = limit * (currentPage - 1) + 1;
    const right = totalProducts + left - 1;

    return (
      <div className="homepage">
        <Row className="flex-row">
          <Col xs="12" lg="6" className="order-lg-2 mb-3 px-3 px-md-2">
            <div className="home-carousel">
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={false}
                slides={banners}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => (
                  <img key={index} src={item.imageUrl} />
                ))}
              </CarouselSlider>
            </div>
          </Col>
          <Col xs="12" lg="3" className="order-lg-1 mb-3 px-3 px-md-2">
            <div className="d-flex flex-column h-100 justify-content-between">
              <img src="/images/banners/banner-2.jpg" className="mb-3" />
              <img src="/images/banners/banner-5.jpg" />
            </div>
          </Col>
          <Col xs="12" lg="3" className="order-lg-3 mb-3 px-3 px-md-2">
            <div className="d-flex flex-column h-100 justify-content-between">
              <img src="/images/banners/banner-2.jpg" className="mb-3" />
              <img src="/images/banners/banner-6.jpg" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col
            xs={{ size: 12, order: 1 }}
            sm={{ size: 12, order: 1 }}
            md={{ size: 12, order: 1 }}
            lg={{ size: 3, order: 1 }}
          >
            <ProductFilter filterProducts={filterProducts} />
          </Col>
          <Col
            xs={{ size: 12, order: 2 }}
            sm={{ size: 12, order: 2 }}
            md={{ size: 12, order: 2 }}
            lg={{ size: 9, order: 2 }}
          >
            <Row className="align-items-center mx-0 mb-4 mt-4 mt-lg-0 py-3 py-lg-0 bg-white shop-toolbar">
              <Col
                xs={{ size: 12, order: 1 }}
                sm={{ size: 12, order: 1 }}
                md={{ size: 5, order: 1 }}
                lg={{ size: 6, order: 1 }}
                className="text-center text-md-left mt-3 mt-md-0 mb-1 mb-md-0"
              >
                <span>Showing: </span>
                {totalProducts > 0
                  ? `${left}-${right} products of ${count} products`
                  : `${count} products`}
              </Col>
              <Col
                xs={{ size: 12, order: 2 }}
                sm={{ size: 12, order: 2 }}
                md={{ size: 2, order: 2 }}
                lg={{ size: 2, order: 2 }}
                className="text-right pr-0 d-none d-md-block"
              >
                <span>Sort by</span>
              </Col>
              <Col
                xs={{ size: 12, order: 2 }}
                sm={{ size: 12, order: 2 }}
                md={{ size: 5, order: 2 }}
                lg={{ size: 4, order: 2 }}
              >
                <SelectOption
                  name={"sorting"}
                  value={{ value: order, label: sortOptions[order].label }}
                  options={sortOptions}
                  handleSelectChange={(n, v) => {
                    filterProducts("sorting", n.value);
                  }}
                />
              </Col>
            </Row>
            <Switch>
              <Route exact path="/" component={ProductsShop} />
              <Route path="/shop/category/:slug" component={CategoryShop} />
              <Route path="/shop/brand/:slug" component={BrandsShop} />
              <Route path="*" component={Page404} />
            </Switch>

            {displayPagination && (
              <div className="d-flex justify-content-center text-center mt-4">
                <Pagination
                  totalPages={totalPages}
                  onPagination={filterProducts}
                />
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    advancedFilters: state.product.advancedFilters,
    products: state.product.storeProducts,
  };
};

export default connect(mapStateToProps, actions)(Homepage);
