const db = require('../db')

function main(req, res) {
  const features = db.features.slice(0, 3)
  const products = db.products
    .filter((product) => product.variants[0].in_stock)
    .slice(0, 8)
  const testimonials = db.testimonials.slice(0, 4)

  res.jsonp({
    data: {
      current_offers: db.offers,
      features,
      featured_products: products,
      testimonials,
      recent_posts: db.posts,
      meta: {
        title: 'Интернет-магазин женской одежды Virna',
        description: 'Virna',
        keywords: 'Virna',
        seo_text:
          '<h1>Интернет-магазин женской одежды Virna</h1><p>"Virna" – это не просто интернет магазин женской одежды, это намного больше. Это бренд, который символизирует любовь к комфорту и красивой женской одежде, а также совмещает всё то, что так важно девушкам каждый день.Здесь можно заказать и купить женскую одежду недорого от производителя. Она качественная и доступна для любой девушки, ведь стоит недорого, а ткань и пошив не самом высоком уровне.В каталоге интернет магазина украинского бренда "Virna" ты сможешь ознакомиться со всем ассортиментом и за невысокую стоимость приобрести изделие свой мечты.</p><h2>это намного больше</h2><ol><li>Это бренд, который символизирует любовь к комфорту и красивой женской одежде, а также совмещает всё то, что так важно девушкам каждый день.</li><li>Здесь можно заказать и купить женскую одежду недорого от производителя. Она качественная и доступна для любой девушки, ведь стоит недорого, а ткань и пошив не самом высоком уровне.В каталоге интернет магазина украинского бренда "Virna" ты сможешь ознакомиться со всем ассортиментом и за невысокую стоимость приобрести изделие свой мечты.  Это бренд, который символизирует любовь к </li></ol><p>"Virna" – это не просто интернет магазин женской одежды, это намного больше. Это бренд, который символизирует любовь к комфорту и красивой женской одежде, а также совмещает всё то, что так важно девушкам каждый день.Здесь можно заказать и купить женскую одежду недорого от производителя. Она качественная и доступна для любой девушки, ведь стоит недорого, а ткань и пошив не самом высоком уровне.В каталоге интернет магазина украинского бренда "Virna" ты сможешь ознакомиться со всем ассортиментом и за невысокую стоимость приобрести изделие свой мечты.</p><h2>это намного больше</h2><ol><li>Это бренд, который символизирует любовь к комфорту и красивой женской одежде, а также совмещает всё то, что так важно девушкам каждый день.</li><li>Здесь можно заказать и купить женскую одежду недорого от производителя. Она качественная и доступна для любой девушки, ведь стоит недорого, а ткань и пошив не самом высоком уровне.В каталоге интернет магазина украинского бренда "Virna" ты сможешь ознакомиться со всем ассортиментом и за невысокую стоимость приобрести изделие свой мечты.  Это бренд, который символизирует любовь к </li></ol>',
        og_title: 'Virna',
        og_image: `/img/some-img.jpg`,
        og_description: 'Virna'
      }
    }
  })
}

module.exports = main
