package com.example.experiment8;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PostController.class)
class PostControllerTests {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ScheduledPostProducer producer;

    @Test
    void createPostReturnsAcceptedAndEventContract() throws Exception {
        mockMvc.perform(post("/api/posts")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "eventId": "ci-test-101",
                      "content": "CI pipeline test",
                      "simulateFailure": false
                    }
                    """))
                .andExpect(status().isAccepted())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.eventId").value("ci-test-101"))
                .andExpect(jsonPath("$.content").value("CI pipeline test"))
                .andExpect(jsonPath("$.simulateFailure").value(false));

        verify(producer).sendEvent(any(ScheduledPostEvent.class));
    }

    @Test
    void missingEventIdIsGenerated() throws Exception {
        mockMvc.perform(post("/api/posts")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                      "content": "Generated ID contract test",
                      "simulateFailure": false
                    }
                    """))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.eventId").isNotEmpty())
                .andExpect(jsonPath("$.content").value("Generated ID contract test"));
    }
}
