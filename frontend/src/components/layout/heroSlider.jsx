return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Our Premium Selection</h2>
        <p className={styles.subheading}>Quality products from Maitai Farm</p>
      </div>

      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className={styles.slide}>
            <div className={styles.card}>
              <div className={styles.media}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.productImage} 
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.productName}>{product.name}</h3>
                <Link to={product.path} className={styles.viewBtn}>
                  View Details <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
