pragma solidity^0.5.11;

import "./Campaign.sol";

contract CampaignFactory {
  Campaign[] public deployedCampaigns;

  function createCampaign(uint _minimum) public {
    Campaign newCampaign = new Campaign(_minimum, msg.sender);
    deployedCampaigns.push(newCampaign);
  }

  function getDeployedCampaigns() public view returns (Campaign[] memory) {
    return deployedCampaigns;
  }
}
