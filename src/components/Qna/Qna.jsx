import React from "react";

const Qna = () => {
  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-center font-bold md:text-3xl mb-10 text-xl text-[#2c3792]">
        📢 Frequently Asked <br /> Questions
      </h1>
      <div className="join join-vertical w-full">
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            Is Scholar 360 free to use?
          </div>
          <div className="collapse-content">
            <p>
              Yes, creating an account and searching for scholarships is free.
              However, some features or premium scholarships may require a small
              fee.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">
            Can I apply for multiple scholarships at the same time?
          </div>
          <div className="collapse-content">
            <p>
              Yes! You can apply for multiple scholarships as long as you meet
              their requirements.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">
            How do I apply for a scholarship?
          </div>
          <div className="collapse-content">
            <p>
              Click on the scholarship you’re interested in. Read the
              eligibility criteria and requirements. Click "Apply Now" and
              submit the required documents. Track your application status in
              your dashboard.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">
            How long does it take for my application to be reviewed?
          </div>
          <div className="collapse-content">
            <p>
              It varies. Some scholarships review applications within a few
              weeks, while others take months.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">
            Can I edit my application after submission?
          </div>
          <div className="collapse-content">
            <p>
              Yes, but you cannot edit your application after status is
              rejected. Make sure to double-check everything before submitting!
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title text-xl font-medium">
            How do I contact support?
          </div>
          <div className="collapse-content">
            <p>
              Visit the Contact Us page or email us at ratulrakibur5@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qna;
