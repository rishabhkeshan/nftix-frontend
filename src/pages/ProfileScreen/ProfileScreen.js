import "./ProfileScreen.scss";
import React from 'react'

export default function ProfileScreen() {
  const fetched = {
    data: {
      id: "6368b298fbd38ea3f8b23444",
      username: "benro",
      email: "hey@benro.dev",
      hash_pwd: "$2a$10$QgddOYP4hDanG0lTrsJfbOH5N5PGE3SpeZKpx4D.x8r9MGfl/yNYG",
      wallet_id: "mantle17acqqlnrc62v6qegp38rptukg7fhmr0d02etl7",
      nub_id:
        "devnet-mantle-1.cGn3HMW8M3t5gMDv-wXa9sseHnA=|qn00KUqTBnWFAkg0B5LIQYHnE88=",
      hashed_nem:
        "U2FsdGVkX18c6/INKUl8bx2WNqP5vANeBuIGcoTREeLrLdNWeqIsI56Pqq5Ri7Pb3EQSafytHnVYnw5vAS4zE+W2nKeI2BDyfUTo1TvgGApApv8ffQNkuXIxZuBio2IwP3o/lPEJUt0r559PTfKluL2oVGhm+7vXcwQyJWwsAxKYKgss9OMmbCCYbdtK9vjVOpyijU2TNMDDCRv/Qlk2Ci1I2ozZk82TYeAMvtZqm6yaowzhblyK7OIbEP6DaIdhneWpGIfXN54G65ijHUc6BA==",
      is_org: true,
      is_new: false,
    },
    description: "user data fetched!",
    status: true,
  };
  const userData = fetched.data;
  // I did this for simplicity
  return (
    <div className="profilescreen">
      <div className="profilescreen_maincontainer">
        <div>
          <div className="profilescreen_maincontainer_title">Username</div>
          <div className="profilescreen_maincontainer_subtitle">{userData?.username}</div>
        </div>
        <div>
          <div className="profilescreen_maincontainer_title">Email</div>
          <div className="profilescreen_maincontainer_subtitle">{userData?.email}</div>
        </div>
        <div>
          <div className="profilescreen_maincontainer_title">Identity ID</div>
          <div className="profilescreen_maincontainer_subtitle">
            {userData?.nub_id}
          </div>
        </div>
        <div></div>
        <div className="profilescreen_maincontainer_title">Mantle Address</div>
        <div className="profilescreen_maincontainer_subtitle">
          {userData?.wallet_id}
        </div>
        <div className="profilescreen_maincontainer_title">Balance</div>
        <div className="profilescreen_maincontainer_subtitle">995 MNTL</div>
      </div>
    </div>
  );
}
