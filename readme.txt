1. Preuzeti telefoni.json i telefon.json, koji u sebi sadrzi niz sa 3 telefona i primerak 1 telefona
2. Preuzeti sema.json, koji predstavlja semu za 1 telefon
3. Kreirati folder gde ce biti nasa baza
4. Sada uci u control panel, pa na  system and security, pa na system, pa na system properties, pa na advanced,
enviroment variables i tu izmenimo path sa pathom do nasih mongo funkcija(default:C:\Program Files\MongoDB\Server\4.4\bin)
5. U cmd uci u folder gde je baza i aktivirati mongod
6. U drugom cmd aktivirati mongo
7. U onom gde je mongo ukucati komandu use test, koja ce poceti da koristi bazu test
8. Zatim na istom mestu nalepiti ovo:
        db.createCollection("telefoni", {
        validator: {
            $jsonSchema: {
                    "bsonType": "object",
                    "properties": {
                                "id": {
                                    "bsonType": "int"
                                },
                                "basicData": {
                                    "type": "object",
                                    "additionalProperties": false,
                                    "properties": {
                                        "link": {
                                            "type": "string"
                                        },
                                        "model": {
                                            "type": "string"
                                        },
                                        "brand": {
                                            "type": "string"
                                        },
                                        "phoneImage": {
                                            "type": "string"
                                        },
                                        "price": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "brand",
                                        "link",
                                        "model",
                                        "phoneImage",
                                        "price"
                                    ]
                                },
                                "specs": {
                                    "type": "object",
                                    "additionalProperties": false,
                                    "properties": {
                                        "memory": {
                                            "type": "string"
                                        },
                                        "battery": {
                                            "type": "string"
                                        },
                                        "camera": {
                                            "type": "string"
                                        }
                                    },
                                    "required": [
                                        "battery",
                                        "camera",
                                        "memory"
                                    ]
                                },
                                "review": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "additionalProperties": false,
                                        "properties": {
                                            "reviewtext": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "additionalProperties": false,
                                                    "properties": {
                                                        "heading": {
                                                            "type": "string"
                                                        },
                                                        "text": {
                                                            "type": "array",
                                                            "items": {
                                                                "type": "string"
                                                            }
                                                        },
                                                        "picture": {
                                                            "type": "string"
                                                        },
                                                        "alt": {
                                                            "type": "string"
                                                        },
                                                        "caption": {
                                                            "type": "string"
                                                        }
                                                    },
                                                    "required": [
                                                        "alt",
                                                        "caption",
                                                        "heading",
                                                        "picture",
                                                        "text"
                                                    ]
                                                }
                                            },
                                            "reviewauthor": {
                                                "type": "string"
                                            },
                                            "dugme": {
                                                "type": "string"
                                            },
                                            "naziv": {
                                                "type": "string"
                                            },
                                            "reviewurl": {
                                                "type": "string",
                                            }
                                        },
                                        "required": [
                                            "naziv",
                                            "reviewauthor"
                                        ]
                                    }
                                },
                                "experiences": {
                                    "type": "array",
                                    "items": {
                                        "type": "object",
                                        "additionalProperties": false,
                                        "properties": {
                                            "id": {
                                                "bsonType": "int"
                                            },
                                            "authorname": {
                                                "type": "string"
                                            },
                                            "rating": {
                                                "bsonType": "int"
                                            },
                                            "text": {
                                                "type": "string"
                                            },
                                            "likes": {
                                                "bsonType": "int"
                                            },
                                            "dislikes": {
                                                "bsonType": "int"
                                            },
                                            "comments": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "additionalProperties": false,
                                                    "properties": {
                                                        "id": {
                                                            "bsonType": "int"
                                                        },
                                                        "authorname": {
                                                            "type": "string"
                                                        },
                                                        "text": {
                                                            "type": "string"
                                                        }
                                                    },
                                                    "required": [
                                                        "authorname",
                                                        "id",
                                                        "text"
                                                    ]
                                                }
                                            }
                                        },
                                        "required": [
                                            "authorname",
                                            "comments",
                                            "dislikes",
                                            "id",
                                            "likes",
                                            "rating",
                                            "text"
                                        ]
                                    }
                                }
                            },
                            "required": [
                                "basicData",
                                "experiences",
                                "id",
                                "review",
                                "specs"
                            ],
                }
            }
        })
9. Putem mongodb compasa dodamo tu fajl telefoni.json(radi) i telefon.json(ne radi)