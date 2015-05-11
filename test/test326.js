if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 326 FOREIGN KEYS', function() {

  it('1. CREATE DATABASE',function(done){
    alasql('CREATE DATABASE test326; USE test326');
    done();
  });

  it('2. CREATE TABLES City',function(done){

    alasql(function(){/*
      CREATE TABLE dbo.Cities
      (
        cityid  CHAR(3)     NOT NULL PRIMARY KEY,
        city    VARCHAR(30) NOT NULL,
        region  VARCHAR(30) NULL,
        country VARCHAR(30) NOT NULL
      );
    */});
    done();
  });

  it('3. INSERT VALUES INTO City',function(done){

    alasql(function(){/*
      INSERT INTO dbo.Cities(cityid, city, region, country) VALUES
        ('ATL', 'Atlanta', 'GA', 'USA'),
        ('ORD', 'Chicago', 'IL', 'USA'),
        ('DEN', 'Denver', 'CO', 'USA'),
        ('IAH', 'Houston', 'TX', 'USA'),
        ('MCI', 'Kansas City', 'KS', 'USA'),
        ('LAX', 'Los Angeles', 'CA', 'USA'),
        ('MIA', 'Miami', 'FL', 'USA'),
        ('MSP', 'Minneapolis', 'MN', 'USA'),
        ('JFK', 'New York', 'NY', 'USA'),
        ('SEA', 'Seattle', 'WA', 'USA'),
        ('SFO', 'San Francisco', 'CA', 'USA'),
        ('ANC', 'Anchorage', 'AK', 'USA'),
        ('FAI', 'Fairbanks', 'AK', 'USA');
    */});
    done();
  });

  it('4. CREATE TABLE Roads',function(done){

    alasql(function(){/*
      CREATE TABLE dbo.Roads
      (
        city1       CHAR(3) NOT NULL REFERENCES dbo.Cities,
        city2       CHAR(3) NOT NULL REFERENCES dbo.Cities,
        distance INT     NOT NULL,
        PRIMARY KEY(city1, city2),
        CHECK(city1 < city2),
        CHECK(distance > 0)
      );
    */});
    done();
  });

  it('5. INSERT VALUES INTO Roads',function(done){

    alasql(function(){/*
      INSERT INTO dbo.Roads(city1, city2, distance) VALUES
        ('ANC', 'FAI',  359),
        ('ATL', 'ORD',  715),
        ('ATL', 'IAH',  800),
        ('ATL', 'MCI',  805),
        ('ATL', 'MIA',  665),
        ('ATL', 'JFK',  865),
        ('DEN', 'IAH', 1120),
        ('DEN', 'MCI',  600),
        ('DEN', 'LAX', 1025),
        ('DEN', 'MSP',  915),
        ('DEN', 'SEA', 1335),
        ('DEN', 'SFO', 1270),
        ('IAH', 'MCI',  795),
        ('IAH', 'LAX', 1550),
        ('IAH', 'MIA', 1190),
        ('JFK', 'ORD',  795),
        ('LAX', 'SFO',  385),
        ('MCI', 'ORD',  525),
        ('MCI', 'MSP',  440),
        ('MSP', 'ORD',  410),
        ('MSP', 'SEA', 2015),
        ('SEA', 'SFO',  815);
      */});
    done();
  });

  it('6. INSERT wrong FOREIGN KEY',function(done){
    assert.throws(function(){
      alasql("INSERT INTO dbo.Roads(city1, city2, distance) VALUES \
          ('SFO', 'SVO', 99999)"); // SVO - Sheremetievo - Airport
          // There is no such airport in the list      
    });
    done();
  });
      
  it('99. DROP DATABASE',function(done){
    alasql('DROP DATABASE test326');
    done();
  });

});

