describe('OAuth1 var in url params', function() {
    var testrun;

    before(function(done) {
        this.run({
            collection: {
                item: [{
                    event: [{
                        listen: 'prerequest',
                        script: {
                            exec: 'postman.setEnvironmentVariable("vala", "omg");'
                        }
                    }],
                    request: {
                        auth: {
                            type: 'oauth1',
                            oauth1: {
                                consumerKey: 'RKCGzna7bv9YD57c',
                                consumerSecret: 'D+EdQ-gs$-%@2Nu7',
                                token: '',
                                tokenSecret: '',
                                signatureMethod: 'HMAC-SHA1',
                                timeStamp: 1461319769,
                                nonce: 'ik3oT5',
                                version: '1.0',
                                realm: '',
                                addParamsToHeader: true,
                                addEmptyParamsToSign: false
                            }
                        },
                        url: 'https://postman-echo.com/oauth1?a={{vala}}',
                        method: 'GET'
                    }
                }]
            }
        }, function(err, results) {
            testrun = results;
            done(err);
        });
    });

    it('must have signed the oauth1 request successfully', function() {
        expect(testrun).be.ok();
        expect(testrun.request.calledOnce).be.ok();

        expect(testrun.request.getCall(0).args[0]).to.be(null);

        var response = testrun.request.getCall(0).args[2];
        expect(response.code).to.eql(200);
        expect(response.json()).to.have.property('status', 'pass');
    });

    it('must have completed the run', function() {
        expect(testrun).be.ok();
        expect(testrun.done.calledOnce).be.ok();
        expect(testrun.done.getCall(0).args[0]).to.be(null);
        expect(testrun.start.calledOnce).be.ok();
    });
});
