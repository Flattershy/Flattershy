import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "./ERC721.sol";
import "./WithdrawFairly.sol";

contract MekaBot is ERC721, Ownable, ReentrancyGuard, WithdrawFairly  {

    using MerkleProof for bytes32[];
    bytes32 merkleRoot;

    uint16 public constant MAX_SUPPLY = 8888;
    uint16 public constant START_AT = 1;

    uint16 public mintTracked;
    uint16 public burnedTracker;

    struct Sale {
        uint64 start;
        uint64 end;
        uint16 maxPerWallet;
        uint8 maxPerTx;
        uint256 price;
        bool paused;
    }

    string public baseTokenURI;

    mapping(string => Sale) public sales;
    mapping(string => mapping(address => uint16)) balance;

    event EventMint(uint256 _tokenId);
    event EventSaleChange(string _name, Sale sale);

    constructor(string memory baseURI) ERC721("MekaBot", "MBOT") WithdrawFairly(){
        setBaseURI(baseURI);
    }
