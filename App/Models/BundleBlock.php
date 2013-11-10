<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 11/10/13
 * Time: 10:04 AM
 */

namespace BlockStore;


/**
 * @Entity @Table(name="blockstore_bundle_blocks")
 */
class BundleBlock extends \Model
{
    /**
     * @Id @GeneratedValue(strategy="AUTO") @Column(type="integer")
     */
    public $id;

    /**
     * @Column(type="string")
     */
    private $name;

    /**
     * @Column(type="text")
     */
    private $description;

    /**
     * @Column(type="string")
     */
    private $url;


    /**
     * @ManyToOne(targetEntity="\User")
     */
    private $creator;

    /**
     * @Column(type="datetime")
     */
    private $created;

    /**
     * @Column(type="datetime")
     */
    private $last_updated;

    /**
     * @Column(type="text")
     */
    private $data;


    /**
     *
     */
    public function __construct()
    {
        $this->last_updated = new \DateTime();
        $this->created = new \DateTime();
        $this->data = json_encode(array());
    }

    /**
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param \DateTime $created
     */
    public function setCreated($created)
    {
        $this->created = $created;
    }

    /**
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * @param \User $creator
     */
    public function setCreator($creator)
    {
        $this->creator = $creator;
    }

    /**
     * @return \User
     */
    public function getCreator()
    {
        return $this->creator;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param \DateTime $last_updated
     */
    public function setLastUpdated($last_updated)
    {
        $this->last_updated = $last_updated;
    }

    /**
     * @return \DateTime
     */
    public function getLastUpdated()
    {
        return $this->last_updated;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $url
     */
    public function setUrl($url)
    {
        $this->url = $url;
    }

    /**
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param array $data
     */
    public function setData($data)
    {
        $this->data = json_encode($data);
    }

    /**
     * @return array
     */
    public function getData()
    {
        return json_decode($this->data, true);
    }


    /**
     * @return array
     */
    public function toArray()
    {
        $array = array(
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "url" => $this->url,
            "creator" => $this->creator->toArray(),
            "last_updated" => $this->last_updated,
            "created" => $this->created,

        );
        $data = $this->getData();

        if (is_array($data))
        {
            $array = array_merge($array, $data);
        }

        return $array;
    }

    //OVERRIDEN
    /**
     * @param array $params
     * @return BundleBlock[]
     */
    static function all($params = array())
    {
        return parent::all($params);
    }

    /**
     * @param Integer $id the id of the block
     * @return BundleBlock
     */
    static function find($id)
    {
        return parent::find($id);
    }

    /**
     * @param array $where
     * @return BundleBlock[]
     */
    static function where($where = array())
    {
        return parent::where($where);
    }

    /**
     * @param array $options
     * @return BundleBlock[]
     */
    static function search($options = array())
    {
        return parent::search($options);
    }

} 