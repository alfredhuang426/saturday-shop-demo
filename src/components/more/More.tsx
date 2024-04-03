import { NavLink } from "react-router-dom";

export const More = () => {
  return (
    <div className="container my-5">
      <h3 className="border-start border-bottom border-5 px-2 py-1 border-primary">
        漢堡系列
      </h3>
      <div className="row mb-5">
        <div className="col-md-7">
          <img
            alt="burger"
            className="w-100"
            src="https://storage.googleapis.com/vue-course-api.appspot.com/alfred-shop-demo/1712160081258.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=AURz%2BEndzcCWELugdUC%2F93t%2BXnzjjnWA5Kw0Gl9ojx4LTXwiqIj2u%2B4mKIEMtyZiHtkXQRLZZoKXnyLtU3NYMTNUeNnY5qX3sUIwD%2Be7fKEIn9MyK4tyPbop9qn9mmoX3U3TJz7e5ZlWTCtAWX%2FKkOLpBu9OwV7vSOvzBCVGNqYcCWmOns3vkMPRggLLyvledw7431W1Aho29LfNGKsKldq119La7jMdtqaM757touFk0084wT5tqIPPh1f6e%2FlFU1tJmgvl7MwrGibIhR%2ByjkrgwV%2BLU1gZEHTipK6qLXLbwXhv6fsJlWgSEiEOFr5fitrRC1OjUL1c746pOwLucQ%3D%3D"
          />
        </div>
        <div className="col-md-5">
          <div className="d-flex justify-content-center flex-column h-100">
            <ul className="mb-auto mt-md-5">
              <li className="my-3">培根牛肉堡</li>
              <li className="my-3">起司蕈菇堡</li>
              <li className="my-3">花生醬牛肉堡</li>
              <li className="my-3">鮮蔬大麥克</li>
            </ul>
            <div>
              <NavLink to="/" className="btn btn-primary w-100 text-white">
                前往選購
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <h3 className="border-start border-bottom border-5 px-2 py-1 border-primary">
        薯條系列
      </h3>
      <div className="row flex-row-reverse mb-5">
        <div className="col-md-7">
          <img
            alt="fries"
            className="w-100"
            src="https://storage.googleapis.com/vue-course-api.appspot.com/alfred-shop-demo/1712160136882.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fKmTjc3uU8HDaHxqOXfZlRVDpZofcaDp5%2FTtdNZ2Y65Gz135BXCQpezz11N06XXEE%2Fmv0HFtBME9KY%2FGYrU%2BllVpWyL5bMQGTLFgZTvc1Bh6PNwbFrJff7IABh%2BO4Ymh%2FgIt%2BHLEceSrRtsn2BPG59zgwBvYVxMvqqcpa%2BkUHfVzFaXCx0csezbdAnbWsecSyYIrLkd1rc%2BL6A%2BtS8Fh65EfOblIJ5wBBE2zMSmer%2FRdT0ARSHPCwsXm4oXRhd3Pp8J47jGidv2nRSnK0XICEySDBhZFUeQ3dlm9lClKlC0QYRF29rKr7LiZf%2FNUlDappJfKw49GZw4ENlkuV4VvxQ%3D%3D"
          />
        </div>
        <div className="col-md-5">
          <div className="d-flex justify-content-center flex-column h-100">
            <ul className="mb-auto mt-md-5">
              <li className="my-3">波浪薯條</li>
              <li className="my-3">肯瓊薯條</li>
              <li className="my-3">炸魚薯條</li>
            </ul>
            <div>
              <NavLink to="/" className="btn btn-primary w-100 text-white">
                前往選購
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <h3 className="border-start border-bottom border-5 px-2 py-1 border-primary">
        義大利麵系列
      </h3>
      <div className="row mb-5">
        <div className="col-md-7">
          <img
            alt="pasta"
            className="w-100"
            src="https://storage.googleapis.com/vue-course-api.appspot.com/alfred-shop-demo/1712160173922.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=c7t3LkNhzoprgwivxuucSglppNqIt9vYaBu71l0FBksl714kqSLfSnaPkhFg2yGTwyH6YJsgFUU4qcmdWqX7zukf7DHVJvRt4p4kj3256%2B3GNhg2AqUuONfhGjpM%2FLFWASUNgYYdLnJEyaXZ6ZK%2BFUA4ECnGn8zlZwD2ODxgJ6vXDT1%2FVeRoN2vUEKlvxJfdgPllGC%2FZb17V79jLDrD94doVi6p5NfKaY3%2B72rvHERtel13zGfmlTPTRB3N1%2BE%2BYiVNr1H3H0DsER0%2FLDwnIOZrx1Zdb2n8%2FdjIUnxdRIVk2T%2BKgESm%2BBpf7Q8yZYZr%2BO1boJQqdt1OLleXqC66C%2BA%3D%3D"
          />
        </div>
        <div className="col-md-5">
          <div className="d-flex justify-content-center flex-column h-100">
            <ul className="mb-auto mt-md-5">
              <li className="my-3">黑橄欖紅醬寬麵</li>
              <li className="my-3">巨蝦義大利麵</li>
              <li className="my-3">牛肉丸義大利麵</li>
              <li className="my-3">肉醬義大利麵</li>
            </ul>
            <div>
              <NavLink to="/" className="btn btn-primary w-100 text-white">
                前往選購
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <h3 className="border-start border-bottom border-5 px-2 py-1 border-primary">
        披薩系列
      </h3>
      <div className="row flex-row-reverse mb-5">
        <div className="col-md-7">
          <img
            alt="pizza"
            className="w-100 fit"
            src="https://storage.googleapis.com/vue-course-api.appspot.com/alfred-shop-demo/1712160221082.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=QeTgkXxp8sZkVUw%2FztnQGeR%2Bc6J%2Bg1tZXfXBICuFUwAml9A%2FsQ9RlSmLqB%2F9mAbFq%2BKkxoD4nPmhOMRWWJ3TYITYUPaZ00SURppDiGbRjBdWr8isyhocLym3qmSyS4LkV7OIvAWGzRZNW1Pf8bVS7vlf66f1gNLxmGixK4J3h6ilMGRtRVhPIZo1O4ixEPoESmNHksbIcnQFzb%2F2MKyBQ%2FZMn6kQzwdW9yRs%2B8GBx29tbRq%2F7RHyqWXIn9szXQZqFzIgETXrJCdsy3XL9LA3DiCNpwwcB8f1iwK7trr%2FpA%2BZlrWqbs9eXkgz07Y6QvxeGhLHEgbmua%2F%2BORuam9bkDQ%3D%3D"
          />
        </div>
        <div className="col-md-5">
          <div className="d-flex justify-content-center flex-column h-100">
            <ul className="mb-auto mt-md-5">
              <li className="my-3">香腸起司披薩</li>
              <li className="my-3">總匯披薩</li>
            </ul>
            <div>
              <NavLink to="/" className="btn btn-primary w-100 text-white">
                前往選購
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
