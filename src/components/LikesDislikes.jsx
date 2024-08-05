import React from "react";

const LikesDislikes = () => {
  return (
    <div className="w-50 p-3 d-flex">
      <section className=" w-50">
        <h3>Likes</h3>
        <ul className="ps-0">
          <li>Music</li>
          <li>Blocks</li>
          <li>Peek-a-boo</li>
        </ul>
      </section>
      <section className=" w-50">
        <h3>Dislikes</h3>
        <ul className="ps-0">
          <li>Spiders</li>
          <li>Loud talking</li>
        </ul>
      </section>
    </div>
  );
};

export default LikesDislikes;
