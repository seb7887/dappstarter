pragma solidity^0.5.11;

contract Campaign {
  struct Request {
    string description;
    uint value;
    address payable recipient;
    bool complete;
    uint approvalCount;
    mapping(address => bool) approvals;
  }

  Request[] public requests;
  address public manager;
  uint public minimumContribution;
  uint public approversCount;
  // Search: Array -> O(n) | Mapping -> O(1)
  mapping(address => bool) public approvers;

  modifier restricted() {
    require(msg.sender == manager, "Sender is not the manager");
    _;
  }

  constructor(uint _minimum, address _creator) public {
    manager = _creator;
    minimumContribution = _minimum;
  }

  function contribute() public payable {
    require(msg.value > minimumContribution, "Minimum contribution is required");
    approvers[msg.sender] = true;
    approversCount++;
  }

  function createRequest(string memory _description, uint _value, address payable _recipient) public restricted {
    Request memory newRequest = Request({
      description: _description,
      value: _value,
      recipient: _recipient,
      complete: false,
      approvalCount: 0
    });
    requests.push(newRequest);
  }

  function approveRequest(uint _index) public {
    Request storage request = requests[_index];

    require(approvers[msg.sender], "Sender not exists as approver");
    require(!request.approvals[msg.sender], "Sender exists in request approvals");

    request.approvals[msg.sender] = true;
    request.approvalCount++;
  }

  function finalizeRequest(uint _index) public restricted {
    Request storage request = requests[_index];

    require(request.approvalCount > (approversCount / 2), "Lower approvalCount");
    require(!request.complete, "Request must be complete");

    request.recipient.transfer(request.value);
    request.complete = true;
  }

  function getSummary() public view returns (uint, uint, uint, uint, address) {
    return (
      minimumContribution,
      address(this).balance,
      requests.length,
      approversCount,
      manager
    );
  }

  function getRequestsCount() public view returns (uint) {
    return requests.length;
  }
}