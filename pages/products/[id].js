import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { motion } from "framer-motion";

const easing = [0.6, -0.05, 0.01, 0.99];

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const Product = (props) => (
  <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
    <div className="fullscreen">
      <div className="product">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="img"
        >
          <motion.img
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transiton={{ delay: 0.2 }}
            key={props.product.image}
            src={props.product.image}
          />
        </motion.div>

        <div className="product-details">
          <motion.div variants={stagger} className="inner">
            <Link href="/">
              <motion.div variants={fadeInUp}>
                <a className="go-back">Back to products</a>
              </motion.div>
            </Link>

            <motion.div variants={fadeInUp}>
              <span className="category">Protein</span>
            </motion.div>

            <motion.h1 variants={fadeInUp}>{props.product.name}</motion.h1>

            <motion.p variants={fadeInUp}>{props.product.details}</motion.p>

            <motion.div variants={fadeInUp} className="additonals">
              <span>Soy Free</span>
              <span>Gluten Free</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="qty-price">
              <div className="qty">
                <div className="minus">-</div>
                <div className="amount">1</div>
                <div className="add">+</div>
              </div>

              <span className="price">{props.product.price}</span>
            </motion.div>

            <motion.div variants={fadeInUp} className="btn-row">
              <button className="add-to-cart"> Add to cart</button>

              <button className="subscribe"> Subscribe</button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

Product.getInitialProps = async function (context) {
  const { id } = context.query;
  const res = await fetch(
    `http://my-json-server.typicode.com/wrongakram/demo/products/${id}`
  );
  const product = await res.json();
  return { product };
};

export default Product;
