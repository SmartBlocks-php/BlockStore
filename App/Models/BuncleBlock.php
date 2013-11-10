<?php
/**
 * Created by Antoine Jackson
 * User: Antoine Jackson
 * Date: 11/10/13
 * Time: 10:04 AM
 */

namespace BlockStore;


class BuncleBlock extends \Model
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
     * @ManyToOne(targetEntitiy="\User")
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
        $this->last_updated = new DateTime();
        $this->created = new DateTime();
        $this->data = json_encode(array());
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @param mixed $created
     */
    public function setCreated($created)
    {
        $this->created = $created;
    }

    /**
     * @return mixed
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * @param mixed $creator
     */
    public function setCreator($creator)
    {
        $this->creator = $creator;
    }

    /**
     * @return mixed
     */
    public function getCreator()
    {
        return $this->creator;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $last_updated
     */
    public function setLastUpdated($last_updated)
    {
        $this->last_updated = $last_updated;
    }

    /**
     * @return mixed
     */
    public function getLastUpdated()
    {
        return $this->last_updated;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $url
     */
    public function setUrl($url)
    {
        $this->url = $url;
    }

    /**
     * @return mixed
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param mixed $data
     */
    public function setData($data)
    {
        $this->data = json_encode($data);
    }

    /**
     * @return mixed
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
} 